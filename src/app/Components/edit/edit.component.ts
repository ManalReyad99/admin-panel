import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
CategoryList:ICategory[]=[];
newProduct:IProduct;
alert:boolean=false;
selectedCatID:number=0;
EditProduct=new FormGroup({
  Name:new FormControl(''),
  Price:new FormControl(''),
  Quantity:new FormControl(''),
  Image :new FormControl(''),
  Category:new FormControl('')
});


  constructor(private productService :ProductService,private router:ActivatedRoute,private formBuilder:FormBuilder,private categoryService :CategoryService ) {
   
   }

  ngOnInit(): void {
    this.categoryService.GetAllCategories().subscribe((result)=>{
      this.CategoryList=result;
    });

    console.log(this.router.snapshot.params.id);

this.productService.GetCurrentProductData(this.router.snapshot.params.id).subscribe((result)=>{

  this.EditProduct=new FormGroup({
    Name:new FormControl(result['name']),
    Price:new FormControl(result['price']),
    Quantity:new FormControl(result['quantity']),
    Image :new FormControl(''),
    Category:new FormControl(result['categoryid'])
});

// this.EditProduct=this.formBuilder.group({

//   name: [result['Name'], Validators.required],
//   price: [result['Price'], Validators.required],
//   quantity : [result['Quantity'],Validators.required],
//   image :['Image',Validators.required],
//   Category:[result['Category'],Validators.required]
// })
})
   

}

Edit(){
  console.log(this.EditProduct.value);
this.productService.EditProduct(this.router.snapshot.params.id,this.EditProduct.value).subscribe((result=>{
  console.log(result,"Product Updated Successfuly");
  this.alert=true;
}))

}
CloseAlert()
{
  this.alert=false
}


}