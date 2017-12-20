import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Business } from '../models/business.model';
import { AppSettings } from '../utility/app-settings';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class BusinessService {

  constructor(private http: HttpClient) { }

  getBusinesses(id: number): Observable<Business[]> {
    return this.http.get<Business[]>(AppSettings.apiUrl + '/api/business/getBusinessesBySubId/' + id, AppSettings.httpOptions).pipe(
      catchError(this.handleError<Business[]>('operation'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return _throw(error);
    };
  }

}
