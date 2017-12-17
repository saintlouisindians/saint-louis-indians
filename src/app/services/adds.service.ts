import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../utility/app-settings';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Add } from '../models/add.model';

@Injectable()
export class AddsService {

  constructor(private http: HttpClient) { }

  getAdds(id: number): Observable<Add[]> {
    return this.http.get<Add[]>(AppSettings.apiUrl + '/api/home/getPosts/' + id, AppSettings.httpOptions).pipe(
      catchError(this.handleError<Add[]>('getAdds'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return _throw(error);
    };
  }

}
