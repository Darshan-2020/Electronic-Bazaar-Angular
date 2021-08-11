import { UserService } from 'src/app/services/userServices/user.service';
import { Mycart } from './../../models/mycart';
import { MycartService } from './../../services/mycart/mycart.service';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { ProductList } from './../../models/product';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categoryList: any;
  productsList : any;
  data: any;
  p : any = 1;
  constructor(private http: AppService , private cartService : MycartService , private userService : UserService) { }
  ngOnInit(): any {
    this.http.postRequestWithToken("product/getAll", {}).subscribe(data => {
      this.productsList = data;
    }, error => {
      alert("Server connection error  " + error)
    })
  } 



  addCart(obj:any ){
    var cartObj = {
      "userId" : this.userService.getLoginDataByKey("user_id"),
      "productId":obj.id,
      "qty":"1",
      "price":obj.price
    }
    this.cartService.addCart(cartObj);
    
  }
  // getProductsByCateogy(obj: any) {
  //   let request = {
  //     "cat_id": obj.id
  //   }
  //   this.http.postRequestWithToken('api/product/getProductsByCategory', request).subscribe(data => {
  //     this.productsList = data
  //     if (this.productsList.length == 0) {
  //       alert("No Product is found..");
  //     }
  //   }, error => {
  //     alert("Error in login " + error);
  //   })
  // }
}
