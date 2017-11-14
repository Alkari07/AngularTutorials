import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'; //<-- NgModel lives here

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent //Angular CLI auto declared the component in App module when the component was generated
    //Every component must be declared in exactly one NgModule
  ],
  imports: [
    BrowserModule,
    //also need to add it to the imports array here so the external module object gets imported
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
