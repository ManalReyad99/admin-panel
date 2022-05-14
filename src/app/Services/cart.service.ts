import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICart } from '../Models/icart';
import { IProduct } from '../Models/iproduct';
@Injectable({
  providedIn: 'root'
})
export class CartService {

   cartItemList : ICart[] =[]
   productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  // setProduct(product : IProduct){
  //   this.cartItemList.push(...product);
  //   this.productList.next(product);
  // }
  addtoCart(product : ICart){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  
}
