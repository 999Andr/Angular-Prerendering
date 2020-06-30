import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html'
})

export class FirstComponent implements OnInit {
  
  title = 'Site Code. Prerendering Angular Universal';
  
  constructor( 
    private titleService: Title,
    private metaTagService: Meta ) { }

  ngOnInit(): void {
   
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
    { name: 'description', 
      content: 
      `Site code, building Angular Universal app, Prerendering tech, RESTful architecture, deployd to Firebase` }
    );
  }

}
