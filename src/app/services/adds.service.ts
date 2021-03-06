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

  createAdd(add: Add) {
    return this.http.post(AppSettings.apiUrl + '/api/adds/createAdd', add).pipe(
      catchError(this.handleError('createAdd'))
    )
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  getAddsByUserID(): Observable<Add[]> {
    return this.http.get<Add[]>(AppSettings.apiUrl + '/api/adds/getAddsByUserId').pipe(
      catchError(this.handleError<Add[]>('GetAddsByUserId'))
    )
  }

  deleteAdd(add: Add) {
    return this.http.post(AppSettings.apiUrl + '/api/adds/deleteAdd', add).pipe(
      catchError(this.handleError<any>('deleteAdd'))
    )
  }

  updateAdd(add: Add) {
    return this.http.post(AppSettings.apiUrl + '/api/adds/UpdateAdd', add).pipe(
      catchError(this.handleError<any>('updateAdd'))
    )
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return _throw(error);
    };
  }

}
