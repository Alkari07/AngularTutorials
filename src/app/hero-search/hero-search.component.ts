import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {of} from 'rxjs/observable/of';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  //subject is both a source of observables and an observable itself
  //you can subscribe to the searchTerms stream if you want!
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  //push a search term onto the observable stream
  search(term:string) : void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //wait 300ms after each keystroke before considering the term
      debounceTime(300),
      //ignore new term if same as previous term
      distinctUntilChanged(),
      //switch to new search observable each time the term changes
      //this ensures only the most recent request is displayed even if 
      //the async returns are out of order!
      switchMap((term:string)=>this.heroService.searchHeroes(term))
    );
  }

}
