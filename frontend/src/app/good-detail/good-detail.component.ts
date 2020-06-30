import { Component, OnInit } from '@angular/core';
import { Car } from '../shared/car';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OkService }  from '../shared/ok.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-good-detail',
  templateUrl: './good-detail.component.html'
})

export class GoodDetailComponent implements OnInit {
  
  car: Car;
  carForm: FormGroup;
  del: boolean = false;
  id: number = +this.route.snapshot.paramMap.get('id');
  message: string = '';
  registered: boolean = false;
  submitted: boolean = false;

    
  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private okService: OkService,
    private titleService: Title,
    private metaTagService: Meta) { }

  ngOnInit(): void {
        
    this.getCar(); 
         
    this.carForm = this.formBuilder.group({
      item: ['', [Validators.required, Validators.maxLength(9)]],
    });
    
    this.setTitleMeta(); 
        
    if ((this.okService.checkPlatform) == true) {
      window.scrollTo(pageXOffset, 0);
    };
    
  }

  getCar(): void {
    this.okService.getCar(this.id)
      .subscribe(car => { this.car = car; this.setTitleMeta(); } , err => console.error(err));
  } 
  

  deleteCar(): void {
    this.okService.deleteCar(this.id)
      .subscribe( data => {  
                    this.car = null;  
                    this.del = true; 
                    this.message='deleted';
                    setTimeout(() => { this.okService.router.navigate(['cars']); }, 1000);
                  }, 
                  err => console.error(err) 
      )
  }

  invalidCarName(): boolean {
    return (this.submitted && this.carForm.controls.item.errors != null);
  }
     
  onSubmit() {
    this.submitted = true;

    if (this.carForm.invalid == true) {
      return;
    } else { 
      let car: Car = Object.assign({ id: this.id }, this.carForm.value);
      console.log(car);
      
      this.okService.updateCar(car)
        .subscribe( data => {  
                      this.okService.getCar(this.id)
                        .subscribe( car => {  
                                      this.car = car; this.setTitleMeta();  
                                      this.message = 'updated'; }, 
                                    err => console.error(err)
                      );
                  }, 
                    err => console.error(err) 
        )
      
      this.registered = true;
      this.carForm.reset();
      this.submitted = false;

        }
    
  } 

  setTitleMeta()  {
        
    let title = this.car? 
          
      `${this.car.item} detail. Prerendering Angular Universal`: 
      'Car detail. Prerendering Angular Universal';
          
    this.titleService.setTitle(title);
    this.metaTagService.updateTag(
      { name: 'description', 
        content: `${title.substring(0,3)} model page. Angular Universal SEO site layout.` 
      }
    );
  }  

}
