import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';

//routes tell the router which view to display when a user clicks a link or pastes a url into the browser address bar
// a typical angular route has two elements
// 1) a path, matching the url
// 2) a component
const routes : Routes = [
  {path: 'heroes', component: HeroesComponent}
];

//by convention, the router is a seperate, top level module imported by the root appModule
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
