import { UserService } from './../../services/userServices/user.service';
import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { Mycart } from 'src/app/models/mycart';
import { MycartService } from 'src/app/services/mycart/mycart.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  cartQty = 0;
  cartObj: any;
  cartTotalPrice: any;
  pay_type = "cash_on_delivery";
  delivery_address = "";
  data: any;
  constructor(private http: AppService, private userService: UserService, private mycart : MycartService) {


  }

  ngOnInit(): void {
    this.getCartDetailsByUser();
    this.cartTotalAmount();
  }

  getCartDetailsByUser() {
    var request = {
      "userId": this.userService.getLoginDataByKey("user_id")
    }
    this.http.postRequestWithToken("api/addtocart/getCartsByUserId", request).subscribe((data) => {
      this.cartObj = data;
    }, error => {
      alert("Error while fetching the cart Details");
    })

  }
  
  qtyChange(qty : any,cartObj:any){
    var request = {
      "userId" : this.userService.getLoginDataByKey("user_id"),
     "cartId":cartObj.id,
     "qty":qty,
     "price":(cartObj.price)*(qty),
   }
     this.http.postRequestWithToken("api/addtocart/updateQtyForCart",request).subscribe((data:any)=>{
       this.getCartDetailsByUser();//for updating in the application..
       this.cartTotalAmount();
       console.log(cartObj.price)
     },error=>{
       alert("Error while fetching the cart Details");
     })
   }
  cartTotalAmount() {
    let request = { 'userId': this.userService.getLoginDataByKey("user_id") }
    this.http.postRequestWithToken("api/addtocart/getTotalAmount", request).subscribe((data) => {

      this.cartTotalPrice = data;
      

    }, error => {
      alert("Your cart is empty !!!");
      window.location.href='/home';
    })
  }
 
  removeCart(obj : any) {
  
    var request = {
      "userId": this.userService.getLoginDataByKey("user_id"),
      "cartId":obj.id,
      
    }
    this.http.postRequestWithToken("api/addtocart/removeProductFromCart", request).subscribe((data: any) => {
      window.location.href='/mycart';
    }, error => {
      alert("You have no any product");
    })
  }
  removeAllCart(obj : any) {
  
    var request = {
      "userId": this.userService.getLoginDataByKey("user_id"),
      
    }
    this.http.postRequestWithToken("api/addtocart/removeAllProductFromCart", request).subscribe((data: any) => {
      this.getCartDetailsByUser();
      window.location.href='/mycart';
    }, error => {
      alert("You have no any product !!!");
    })
  }
   getTotalAmounOfTheCart(){
    let obj = this.cartObj;
    let totalPrice  = 0;
   
    for(var o in obj ){      
      totalPrice = totalPrice +parseFloat(obj[o].price);
    }

    return totalPrice.toFixed(2);
  }
  checkoutCart() {

    if (this.pay_type == "cash_on_delivery") {
      let request = {
        "userId": this.userService.getLoginDataByKey("user_id"),
        "total_price": this.getTotalAmounOfTheCart(),
        "pay_type": "COD",
        "deliveryAddress": "add1"
      }
      this.http.postRequestWithToken("api/order/checkout_order", request).subscribe((data) => {

        alert("checkout process completed.Your Order is processed !!!");

        window.location.href='/home';
      }, error => {
        alert("Error in checkout process");
      })

    } else {
      alert("Payment Integration is not yet completed.")
    }
  }
}
