import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../utility/app-settings';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class NavigationService {

  constructor(private http: HttpClient) { }

  getNavigationData(): Observable<any> {
    if (localStorage.getItem('navigationData')) {
      return of(JSON.parse(localStorage.getItem('navigationData')));
    }
    return this.http.get(AppSettings.apiUrl + '/api/home/getnavigationdata', AppSettings.httpOptions).pipe(
      catchError(this.handleError<any>('getNavigationData'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return _throw(error);
    };
  }

}
