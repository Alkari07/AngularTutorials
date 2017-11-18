import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mockHeroes';

@Injectable()
export class HeroService {

  constructor() { }

  getHeroes() : Hero[] {
    return HEROES;
  }

}
