import { UserService } from 'src/app/services/userServices/user.service';
import { Mycart } from './../../models/mycart';
import { AppService } from 'src/app/services/app.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MycartService {

  public cartServiceEvent = new BehaviorSubject({});
  cartQty = 0;
  cartObj = [];
  public cartTotalPrice: any;

  constructor(private http: AppService, private userService: UserService) {


  }

  addCart(obj: any) {
    
    var request = {
      "userId": obj.userId,
      "productId": obj.productId,
      "qty": obj.qty,
      "price": obj.price
    }
    this.http.postRequestWithToken("api/addtocart/addProduct", request).subscribe((data) => {

      alert("Product added to your cart !!!")
      

    },
      error => {
        //if the products is already in cart
        alert("This product is already in cart !!!" );
      })
  }

  getQty() {
    return this.cartQty;
  }

  
}

