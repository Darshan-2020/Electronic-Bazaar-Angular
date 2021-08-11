import { UserService } from './services/userServices/user.service';
import { Component } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'electronic-bazar';
  isLogin = false;

  constructor(private http : AppService , private _http : UserService){
    let request = {}
    this.http.postRequest("api/status" , request).subscribe(
      data=>{console.log("test" , data);
    }, error =>{
      alert("Server connection error" + error)
    })
   
    
  }
}
