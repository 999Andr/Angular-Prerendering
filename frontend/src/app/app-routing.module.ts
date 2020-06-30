import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodComponent } from './good/good.component';
import { FirstComponent } from './first/first.component';
import { GoodDetailComponent } from './good-detail/good-detail.component';
import { UniversalComponent } from './universal/universal.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [ 
  { path: '',  redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: GoodComponent },
  { path: 'car-detail/:id', component: GoodDetailComponent },
  { path: 'code', component: FirstComponent },
  { path: 'universal', component: UniversalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }