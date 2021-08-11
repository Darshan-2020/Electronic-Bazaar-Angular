import { ProductList } from './../../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }
  getItems() {
    return this.httpClient.get<ProductList[]>('localhost:8080/product/getAllCategory');
  }
}
