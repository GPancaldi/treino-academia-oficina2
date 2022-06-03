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

    get(endpoint: any): Observable<any> {
        const url = this.url + endpoint;
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
            })
        };
        return this.http.get(url, httpOptions);
    }
    
    post(endpoint: any, formValue: any): Observable<any> {
        const url = this.url + endpoint;
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
            })
        };
        console.log("post com")
        console.log(httpOptions)
        return this.http.post(url, formValue, httpOptions);
    }

    put(endpoint: any, data: any = null): Observable<any> {
        const url = this.url + endpoint;
        return this.http.put(url, data)
    }

    delete<T>(endpoint : string, data : T = null) {
        const url = this.url + endpoint;
        return this.http.delete(url, {body : data})
      }
}
