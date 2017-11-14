import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';

@Component({
  //this is the component css selector
  selector: 'app-heroes', 
  //location of the template file (html)
  templateUrl: './heroes.component.html',
  //the location of the private css styles
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero : Hero = {
    id: 1,
    name: 'Windstorm'
  }

  constructor() { }

  ngOnInit() {
  }

}
