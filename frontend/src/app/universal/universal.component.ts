import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-universal',
  templateUrl: './universal.component.html'
})

export class UniversalComponent implements OnInit {
    
  title = 'Universal tec. Prerendering';
  
  constructor(private titleService: Title, private metaTagService: Meta) { }

  ngOnInit(): void {

    this.titleService.setTitle(this.title);
    
    this.metaTagService.updateTag(
      { name: 'description', 
        content: 
        'Angular Universal work. Download speed of the Universal site vs the Regular site.'
      }
    );
  }

}
