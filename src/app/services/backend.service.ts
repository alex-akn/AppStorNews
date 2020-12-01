import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import App from '../models/app';
import Param from '../models/param';
import WatchApp from '../models/watchlistapp';

interface AppleSearchObject {
  resultCount: number;
  results: [] 
}

@Injectable()
export class BackendService {

  private thatUrl = 'https://appstor.news/getApps.php';
  //private thatUrl = 'http://localhost:4200/test.html';
  private headers: any;

  constructor(private http: HttpClient) { }

  private mapResults(resp: HttpResponse<any>){
    const msg = resp.body.message;
    console.log(msg);
    if (msg != 'OK') {
      throw new TypeError('thrown in mapResults: ' + msg);
    }
    const keys = resp.headers.keys();
    this.headers = keys.map(key =>
    `${key}: ${resp.headers.get(key)}`);
      
    return resp.body.results || [];
  }

  getMoreApps(params: Param[]):Observable<App[]> {
    console.log(params);
    let getParams = params.reduce((acc:string, param) => {
      acc = acc == '' ? '?' : acc + '&';      
      return acc+param.name + '=' + param.value;
    }, '');
    return this.http.get(this.thatUrl+getParams, { observe: 'response' })
      .pipe(
        retry(3),
        map(this.mapResults),
        catchError(this.handleError));
  }

  searchApps(where: string, what: string): Observable<App[]> {
    what = what.trim();

    const httpar = new HttpParams().set('action', 'search').set('what', what).set('where', where);
     
    return this.http.get(this.thatUrl, { observe: 'response', params:  httpar})
      .pipe(
        map(this.mapResults),
        catchError(this.handleError)
      );
  }

  private mapResultsFromApple(resp: any){
    
    console.log(resp);
    
    /*const keys = resp.headers.keys();
    this.headers = keys.map(key =>
    `${key}: ${resp.headers.get(key)}`);*/
      
    return resp?.results || [];
  }

  searchAppStore(term:string, entity: string = 'software'): Observable<WatchApp[]> {
    term = term.trim();
    //const httpar = new HttpParams().set('action', 'search').set('what', term).set('where', 'appstore');

    const url = "https://itunes.apple.com/search";

    const httpar = new HttpParams().set('term', term).set('entity', entity).set('limit', '25');

    return this.http.jsonp(url+'?'+httpar.toString(), 'callback')
    .pipe(
      map(this.mapResultsFromApple),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side error occurred..
      console.error('An error occurred:', error.error.message);
    } else if (error.error instanceof ProgressEvent){
      // Some kind of network error
      console.error('Network error: ');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);        
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
