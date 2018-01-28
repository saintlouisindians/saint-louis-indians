import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../utility/app-settings';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class EventsService {

  constructor(private http: HttpClient) { }

  addEvent(ev: any): Observable<any> {
    return this.http.post(AppSettings.apiUrl + '/api/events/add', ev).pipe(
      catchError(this.handleError<any>('addEvent'))
    )
  }

  getEvents(startDate: Date, endDate: Date): Observable<any[]> {
    return this.http.get<any[]>(AppSettings.apiUrl + '/api/events/get?startDate=' + startDate.toISOString().slice(0, 10) + '&endDate=' + endDate.toISOString().slice(0, 10)).pipe(
      catchError(this.handleError<any>('getevents'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return _throw(error);
    };
  }
}
