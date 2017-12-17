import { HttpHeaders } from '@angular/common/http';

export class AppSettings {
    public static apiUrl = 'http://stiapi-test.us-west-2.elasticbeanstalk.com';
    public static httpOptions = {
        headers: new HttpHeaders({ 'ContentType': 'application/json; charset=utf-8' })
    };
}