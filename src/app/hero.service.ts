import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mockHeroes';
import {Observable} from 'rxjs/Observable'; //this is used for async calls, like ajax was in jquery
import {of} from 'rxjs/observable/of';
import {MessageService} from './message.service';

@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes() : Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of (HEROES);
  }

  getHero(id : number): Observable<Hero> {
    //Todo: send the message after featching the hero
    //backticks ` define a javascript template literal
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of (HEROES.find(hero=>hero.id===id));
  }

}
