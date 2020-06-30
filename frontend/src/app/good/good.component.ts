import { Component, OnInit } from '@angular/core';
import { OkService } from '../shared/ok.service';
import { Car } from '../shared/car';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-good',
  templateUrl: './good.component.html'
})

export class GoodComponent implements OnInit {
    
  car: Car; 
  cars: Car[];
  carForm: FormGroup;
  registered = false;
  submitted = false;
  title = 'Cars list. Prerendering Angular Universal.';
  
  constructor(
    private formBuilder: FormBuilder, 
    private okService: OkService, 
    private route: ActivatedRoute,
    private titleService: Title,
    private metaTagService: Meta) { }
  
  ngOnInit(): void {
    
    if ((this.okService.checkPlatform) == true) {
      this.getData();
    }
    
    this.carForm = this.formBuilder.group({
      item: ['', [Validators.required, Validators.maxLength(9)]],
    });

    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: 'Angular Universal. SSR. Cars list layout' }
    );
  }

  deleteCar(arg): void { 
    this.cars = this.cars.filter(c => c.id !== arg);
    this.okService.deleteCar(arg)
      .subscribe( data => this.registered = false,  err => console.error(err) )
  }
  
  getData(): void {
    
    this.okService.getAllCars()
      .pipe( 
        map(data=>  { return data.length > 10? 
                      data.filter((newCar:Car) => (newCar.id) != 10): data 
                    }
            )
      )
        .subscribe( result => {  this.cars = result; this.deleteCar(10); },
                    err => console.error(err)
        );
    }
    
  doWord() {  
    let intervalId; 
    const word = 'click';
    let count = 0;
  
    intervalId = setInterval((() => {
      document.getElementById('click').textContent = word.slice(0, count++);
      this.okService.router.events.subscribe(event => clearInterval(intervalId));
       
      if (count > 5 ) {         
        clearInterval(intervalId);
      }
       
    }), 500);
  }
    
  invalidCarName(): boolean {
    return (this.submitted && this.carForm.controls.item.errors != null);
  }
    
  onSubmit() {
    this.submitted = true;

    if (this.carForm.invalid == true) {
      return;
    } else { 
      let car: Car = Object.assign({ id: this.cars.length }, this.carForm.value);
      
      this.okService.pushCar(car)
        .subscribe( data => { this.cars.push(car), this.doWord(); },
                    err => console.error(err)  
        )
          
      this.registered = true; 
      this.carForm.reset();
      this.submitted = false;

    }
  }
    
  trackByFn(index: number, car: Car): number {
    return car.id; 
  } 

}
