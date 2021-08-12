import { User } from './../../models/User';
import { AppService } from './../../services/app.service';
import { UserService } from './../../services/userServices/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  user = new User();
  cartObj : any;
  pay_type  = "cash_on_delivery";
  delivery_address = "";
  cartTotalPrice : any;
  constructor(private http: AppService,private userService : UserService) { }

  ngOnInit(): void {
  }

  getTotalAmounOfTheCart() {
    let obj = this.cartObj;
    let totalPrice = 0;
    for (var o in obj) {
      totalPrice = totalPrice + parseFloat(obj[o].price);
    }
    return totalPrice.toFixed(2);
  }
 
  cartTotalAmount() {
    let request = { 'userId': this.userService.getLoginDataByKey("user_id") }
    this.http.postRequestWithToken("api/addtocart/getTotalAmount", request).subscribe((data) => {

      this.cartTotalPrice = data;

    }, error => {
      alert("Your cart is empty");
    })
  }

  checkoutCart(user : any) {

    if (this.pay_type == "cash_on_delivery") {
      let request = {
        "userId": this.userService.getLoginDataByKey("user_id"),
        "total_price": this.getTotalAmounOfTheCart(),
        "pay_type": user.paymentType,
        "deliveryAddress": user.address
      }
      this.http.postRequestWithToken("api/order/checkout_order", request).subscribe((data) => {

        alert("Checkout process completed.Your Order is processed..");

        console.log("order done")
      }, error => {
        alert("Error in checkout process");
      })

    } else {
      alert("Payment Integration is not yet completed.")
    }
  }
}

