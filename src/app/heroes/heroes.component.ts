import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
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
  heroes: Hero[];

  //when the constructor is called by Angular, a HeroService instance is injected
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() : void {
    //this will subscribe us to updates from the observable service, when that async call completes
    this.heroService.getHeroes().subscribe(heroes=>this.heroes=heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {return;}
    this.heroService.addHero({name} as Hero).subscribe(
      hero=>{this.heroes.push(hero);}
    );
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h=>h!==hero);
    this.heroService.deleteHero(hero).subscribe(); //if you don't subscribe, the service will not actually send the delete request to the server
  }

}
