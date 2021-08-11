import { ProductList } from './../models/product';
import { UserService } from 'src/app/services/userServices/user.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
import { map, filter, scan, catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = "http://localhost:8080/";

  constructor(private httpClient: HttpClient, private userHttp: UserService) { }

  postRequest(url: string, param: {}): Observable<any> {
    return this.httpClient.post(this.url + url, param, httpOptions)
      .pipe(
        catchError(this.handleError.bind(this)) // then handle the error
      );
  }

  postRequestWithToken(url: string, param: {}) {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.userHttp.getLoginToken()
      })
    };
   
    return this.httpClient.post(this.url + url, param, httpOptionsWithToken)
      .pipe(
        catchError(this.handleError.bind(this)) // then handle the error
      );
  }

  private handleError(error: any): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return error;
    } else {
      return throwError("Something went wrong..while connecting with server");
    }
  }





}
