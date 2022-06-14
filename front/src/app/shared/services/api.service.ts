import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';



@Injectable({
    providedIn: 'root'
})
export class ApiService {

    url = "http://localhost:3000";
    user : any;
    constructor(
        private http: HttpClient,
        private _authService : AuthService
    ) {
        this._authService.$user.subscribe((val) => {
            this.user = val;
        });
        console.log("USER NO API")
        console.log(this.user)
    }

    getHttpHeaders() : HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'is-masked' : '0'
        })
    }

    get(endpoint: any): Observable<any> {
        const url = this.url + endpoint;
        return this.http.get(url, {headers : this.getHttpHeaders()});
    }
    
    post(endpoint: any, formValue: any): Observable<any> {
        const url = this.url + endpoint;
        return this.http.post(url, formValue, {headers : this.getHttpHeaders()});
    }

    put(endpoint: any, data: any = null): Observable<any> {
        const url = this.url + endpoint;
        return this.http.put(url, data, {headers : this.getHttpHeaders()})
    }

    delete<T>(endpoint : string, data : T = null) {
        const url = this.url + endpoint;
        return this.http.delete(url, {body : data, headers : this.getHttpHeaders()})
      }
}
