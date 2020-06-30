import { AfterViewChecked, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CanonicalService } from './shared/canonical.service'; 
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
 
export class AppComponent implements OnInit, AfterViewChecked {
	title = 'frontend'; 
	checkPlatform: boolean;
	 
	constructor( 
		@Inject(PLATFORM_ID) platformId: any,
		private metaTagService: Meta,
		private canonicalService: CanonicalService) {
		this.checkPlatform = isPlatformBrowser(platformId) ? true : false; 
	}

	ngOnInit(): void {  
		
		this.metaTagService.addTags([
		{ name: 'keywords', 
		content: 
		'Angular Universal, Angular, Prerendering tech, RESTful architecture, Simple-RESTful-API-Universal'},
		{ name: 'robots', content: 'index, follow' },
		{ name: 'author', content: 'https://github.com/999Andr' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ name: 'date', content: '2020-05-31', scheme: 'YYYY-MM-DD' }
		]);
		this.canonicalService.setCanonicalURL(); 
		
	}
 
 	ngAfterViewChecked(): void { 
  	this.getTime();
  } 

	getTime(): string { 
    
    if ((this.checkPlatform) == true) { 
    	return  localStorage.getItem('First_Contentful_Paint');
    }
    
  }

}