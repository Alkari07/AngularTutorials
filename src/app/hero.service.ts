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
  httpOptions = {
    headers : new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

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
   * GET trying to do a simple string match
   * @param term 
   */
  searchHeroes(term:string) : Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    
    return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`).pipe(
      tap(_=>this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /**
   * PUT: updates hero on server
   * @param hero 
   */
  updateHero (hero: Hero) : Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_=> this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updateHero`))
    );
  }

  /**
   * POST: add a new hero to the server
   * @param hero 
   */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((hero: Hero) =>this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero (hero : Hero | number) : Observable<Hero> {
    const id = typeof hero === 'number' ? hero: hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_=>this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
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
