import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {Observable} from 'rxjs/Observable'; //this is used for async calls, like ajax was in jquery
import {of} from 'rxjs/observable/of';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable()
export class HeroService {
  constructor(private messageService: MessageService,
  private http: HttpClient) { }
  private heroesUrl = 'api/heroes';
  

  getHeroes() : Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(// pipe sends the results multiple different places
        tap(heroes=>this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', [])));
  }

  getHero(id : number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=>this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /**
   * PUT: updates hero on server
   * @param hero 
   */
  updateHero (hero: Hero) : Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_=> this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updateHero`))
    );
  }

  private log(message: string) {
    this.messageService.add("HeroService: " + message);
  }

  /**
   * Handle an Http operation taht failed.
   * Let hte app continue
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T);
    }
  }

}
