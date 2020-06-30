import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
@Component({
  selector: "app-home",
  template: `<div class="bodybox"><h3>Prerendering works</h3></div>`
})


export class HomeComponent implements OnInit {
  
  
  constructor(public router: Router) { } 

  ngOnInit(): void {
    this.router.navigate(['cars']);
  }

}