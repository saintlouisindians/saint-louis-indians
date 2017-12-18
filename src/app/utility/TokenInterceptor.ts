import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
//import { AddsService } from '../services/adds.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!request.url.toLowerCase().endsWith('token')) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
                }
            });
        }
        return next.handle(request);

    }
}