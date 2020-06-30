import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
export interface PlatformVision { name: string; color: string; };

@Component({
  
  selector: "app-show-rendering",
  template: `<p>Rendering by <span [style.color]='rend.color'>{{ rend.name }}</span></p>`
})

export class ShowRenderingComponent {
  rend: PlatformVision;
 
  constructor(@Inject(PLATFORM_ID) platformId: any) {
    this.rend = isPlatformBrowser(platformId) ? { name: "Browser", color: '' } : 
    { name: "Server", color: 'orange' };
  }
}