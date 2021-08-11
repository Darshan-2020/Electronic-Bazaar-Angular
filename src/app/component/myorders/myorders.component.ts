import { MyCheckout } from './../../models/mycheckout';
import { UserService } from 'src/app/services/userServices/user.service';
import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  orders : any;
  mycheckouts : any;
  constructor(private http : AppService , private userService : UserService) { 
    var req = {
      "userId" : this.userService.getLoginDataByKey("user_id")
    }
    this.http.postRequestWithToken("api/order/getOrdersByUserId", req).subscribe(data => {
      this.mycheckouts = data;
      
     
    }, error => {
      alert("Server connection error  " + error)
    })
  }

  ngOnInit(): void {
   
  } 


}
