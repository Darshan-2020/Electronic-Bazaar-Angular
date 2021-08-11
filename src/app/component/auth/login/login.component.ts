import { Observable } from 'rxjs';
import { User } from './../../../models/User';
import { UserService } from './../../../services/userServices/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { ɵNullViewportScroller } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  
  constructor(private http : AppService ,private _http : UserService ,private router : Router) {   }
 

  ngOnInit(): void {
    
  }
  
  loginUserCheck(){
    if(this.user.mobile == "" || this.user.mobile == null){
    alert("Mobile number should not be empty"); 
      return;  
    }
    if(this.user.password == "" || this.user.password == null){
     alert("Password should not be empty");
     return;
    }    
    let request ={
      "mobile": this.user.mobile,
      "password":this.user.password
    }

     this.http.postRequest("api/login/user" , request).subscribe(
       data => {
         if(data.hasOwnProperty("token")){
           this._http.setLoginToken(data['token']);
           this._http.setLoginData(data);
          window.location.href='/home';
                }
         
      }, error =>{
        alert("User not found " );
      }
     )
  }
  

}
