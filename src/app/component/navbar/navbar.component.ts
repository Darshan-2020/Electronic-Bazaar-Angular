import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/userServices/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  public isLoggedIn! : boolean;
  constructor(private http: AppService, private _http: UserService, router: Router) {
    
   }

 

ngOnInit(): void { 
  this.isLoggedIn = this._http.isLoggedIn();  
}

logout(){
  this._http.logout();
  this.isLoggedIn = false ;
  
}
 

}
