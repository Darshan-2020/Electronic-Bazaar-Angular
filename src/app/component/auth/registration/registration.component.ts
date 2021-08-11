import { User } from './../../../models/User';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/userServices/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User();
  isLogin = false; 
  isValidFormSubmitted = false;  
  constructor(private http : AppService ,private userHttp : UserService ,private router : Router) { }
 

  ngOnInit(): void {
  }

  registerUser()  {
    if( this.user.name == null &&  this.user.email == null &&  this.user.mobile == null &&  this.user.password == null ){
      alert("Please enter your details");
     return;
   }
    if(this.user.name =="" || this.user.name == null){
       alert("Name should not be empty");
      return;
    }
    if(this.user.email =="" || this.user.email == null){
     alert("Email should not be empty");
     return;
    }
    if(this.user.mobile =="" || this.user.mobile == null){
      alert("Mobile number should not be empty");
     return;
    }
    if(this.user.password =="" || this.user.password == null){
      alert("password should not be empty");
      return;
     }
    
    let request = {
      "name" : this.user.name,
      "email" : this.user.email,
      "mobile" : this.user.mobile,
      "password" : this.user.password
     }

     this.http.postRequest("api/signup/user" , request).subscribe(
       data => {
        alert("Register successfully..")
        // this.router.navigate(["login"]);
        window.location.href='/login';

      }, error =>{
        alert("This mobile number is already registerd..");
      }
     )
  }
}
