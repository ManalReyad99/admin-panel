import { Component, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ICart } from 'src/app/Models/icart';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { EventEmitter } from '@angular/core';
import { SuccessActionComponent } from '../success-action/success-action.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit,OnChanges {
  CategoryList:ICategory[]=[];
  SelectedCatID:number=0;
  cardItems:ICart[]=[];
  ProductShosen!:IProduct;
  ProductList:IProduct[]=[];
  @Output() public onUploadFinished = new EventEmitter();

CardItems!:ICart ;

  constructor(private productServices:ProductService,private categoryService:CategoryService,private popupDialog:MatDialog) {

    
   }

  ngOnInit(): void {

    this.categoryService.GetAllCategories().subscribe(AllCategories=>{
      this.CategoryList=AllCategories
    })
 this.productServices.GetAllProducts().subscribe(all=>{this.ProductList=all

console.log(all)})
 
 
  }
  openDialog(){
    this.popupDialog.open(PopupComponent, {
      width : '45%'
     });
  }
 

ngOnChanges(changes: SimpleChanges): void {
 
  // this.productServices.GetAllProductsByCatID(this.SelectedCatID).subscribe(ProductList=>
  //   {
  //     if(this.SelectedCatID==0)
  //     this.productServices.GetAllProducts().subscribe(All=>
  //       {
  //         this.FilteredProducts=All;
  //       });
  //       else
  //       {
  //         this.FilteredProducts=ProductList

  //       }
        
  //   })
 
  
 }
 
//  Filter(id:number)
//  {
//    this.FilteredProducts=this.ProductList.filter(p=>p.categoryid==id);
//  }

Delete(id:number)
{
  this.productServices.DeleteProduct(id).subscribe((result)=>{
  })
  this.popupDialog.open(SuccessActionComponent, {
    width : '15%'
   });
  
}

  AddProductsToCard(ShoppingCardItems:ICart)
  {  
    if(this.cardItems.find(el=>el.ProductID==ShoppingCardItems.ProductID)==undefined)

    {
      this.cardItems.push(ShoppingCardItems);

    }
    else{
      alert("This Product already added to card");
    }
       

  }
    
  
  RemoveFromCard(id:number)
  {
    let RemovedProduct=this.cardItems.find(el=>el.ProductID==id)
    const index=this.cardItems.indexOf(RemovedProduct!);
    this.cardItems.splice(index,1);
  
  }

  ngAfterViewInit(): void {

  }

  // Buy()
  // { for (let index = 0; index < this.cardItems.length; index++) {
  //   this.productServices.getProductByID(this.cardItems[index].ProductID).subscribe(
  //     productShosen=>
  //     { this.ProductShosen!=productShosen
  //       this.ProductShosen!.quantity=
  //       this.ProductShosen!.quantity - this.cardItems[index].SelectedQuantity;
  //      this.TotlalPriceOfAllSelectedProduct +=this.cardItems[index].TotalPrice;
  //     }

  //   )
  //   //  this.productServices.GetAllProducts().subscribe(ProductList=>{
  //   //   let ProductShosen=ProductList.find(product=>product.id==this.cardItems[index].ProductID)
     
  //   // })
   
    
  // }
  // this.TotlalPriceOfAllSelectedProduct= this.TotlalPriceOfAllSelectedProduct - (this.TotlalPriceOfAllSelectedProduct * .14);

  // }


}
