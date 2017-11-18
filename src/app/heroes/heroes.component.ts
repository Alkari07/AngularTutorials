import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mockHeroes';
import {HeroService} from '../hero.service';

@Component({
  //this is the component css selector
  selector: 'app-heroes', 
  //location of the template file (html)
  templateUrl: './heroes.component.html',
  //the location of the private css styles
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  //when the constructor is called by Angular, a HeroService instance is injected
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    console.info("hero clicked" + hero.name);
    this.selectedHero = hero;
  }

  getHeroes() : void {
    this.heroes = this.heroService.getHeroes();
  }

}
