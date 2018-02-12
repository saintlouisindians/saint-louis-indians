import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../utility/app-settings';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Movie } from '../models/movie.model';
//import { SpinnerService } from 'angular-spinners';

@Injectable()
export class MoviesService {

  constructor(private http: HttpClient) { }

  addMovie(movie: Movie) {
    return this.http.post(AppSettings.apiUrl + '/api/movies/add', movie).pipe(
      catchError(this.handleError<any>('addMovie'))
    )
  }

  getMovies(startDate: Date, endDate: Date): Observable<Movie[]> {
    return this.http.get<Movie[]>(AppSettings.apiUrl + '/api/movies/get?startDate=' + startDate.toISOString().slice(0, 10) + '&endDate=' + endDate.toISOString().slice(0, 10)).pipe(
      catchError(this.handleError<any>('getMovies'))
    )
  }

  addReview(review){
    return this.http.post(AppSettings.apiUrl+'/api/movies/addReview',review).pipe(
      catchError(this.handleError<any>('addReview'))
    )
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return _throw(error);
    };
  }

}
