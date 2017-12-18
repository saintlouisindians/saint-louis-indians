import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { ConfirmEmailModel } from '../models/confirm-email.model';
import { LoginModel } from '../models/login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSettings} from '../utility/app-settings';

const httpOptions = {
  headers: new HttpHeaders({ 'ContentType': 'application/json; charset=utf-8' })
};

@Injectable()
export class ProfileService {

  //private stlIndiansApiUrl = 'http://stiapi-test.us-west-2.elasticbeanstalk.com';
 //private stlIndiansApiUrl='http://localhost:56711'; 
 loginStatus: boolean = false;
  constructor(private http: HttpClient) { }

  registerUser(registerModel: RegisterModel): Observable<any> {
    return this.http.post(AppSettings.apiUrl + '/api/Account/Register', registerModel, httpOptions).pipe(
      catchError(this.handleError<any>('registerUser'))
    );
  }

  confirmEmail(confirmEmailModel: ConfirmEmailModel): Observable<any> {
    return this.http.post(AppSettings.apiUrl + '/api/Account/ConfirmEmail', confirmEmailModel, httpOptions).pipe(
      catchError(this.handleError<any>('confirmEmail'))
    );
  }

  login(loginModel: LoginModel): Observable<any> {
    return this.http.post(AppSettings.apiUrl + '/token', "UserName=" + encodeURIComponent(loginModel.userName) +
      "&Password=" + encodeURIComponent(loginModel.password) +
      "&grant_type=password").pipe(
      tap(_ => this.updateLoginStatus(true)),
      catchError(this.handleError<any>('login'))
      )
  }

  getLoginStatus(): boolean {
    if (sessionStorage && sessionStorage.getItem('access_token')) return true;
    else return false;
  }

  updateLoginStatus(status: boolean): void {
    this.loginStatus = status;
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return _throw(error);
    };
  }

}
