import { User } from './../../models/User';
import { Injectable } from '@angular/core';
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
export class UserService {



  constructor(private http: HttpClient) { };

  setLoginData(data: any) {
    localStorage.setItem("login_data", JSON.stringify(data.user_profile_details));
  }
  getLoginDataByKey(key: string) {
    let data = JSON.parse(localStorage.getItem('login_data')!);

    if (data.hasOwnProperty(key)) {
      return data[key];
    }
    return null;

  }
  //login user
  setLoginToken(token: string) {
    if (token != "")
      localStorage.setItem("token", token)
  }

  getLoginToken() {
    return localStorage.getItem("token")
  }

  //to check user
  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token === "" || token == null) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    localStorage.removeItem('token');
    return true;
  }

  




}
