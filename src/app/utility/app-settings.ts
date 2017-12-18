import { HttpHeaders } from '@angular/common/http';

export class AppSettings {
    public static apiUrl = 'http://stiapi-test.us-west-2.elasticbeanstalk.com';
    //public static apiUrl = 'http://localhost:56711';
    public static httpOptions = {
        headers: new HttpHeaders({ 'ContentType': 'application/json; charset=utf-8' })
    };

     public static httpwithAuthOptions = {
        headers: new HttpHeaders({'ContentType': 'application/json; charset=utf-8' , 'Authorization': 'Bearer' + sessionStorage.getItem('access_token') })
    };
}