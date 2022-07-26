import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/Models/iproduct';
import { ICategory } from 'src/app/Models/icategory';
import { EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  progress: number=0;
  message: string='';
  alert:boolean=false;

  @Output() public onUploadFinished = new EventEmitter();
productForm !: FormGroup;
Newproduct :IProduct={} as IProduct
categoryList : ICategory[]=[];
selectedCategory :number =0;
ProductDiscount:boolean=true;
  constructor(private formBuilder:FormBuilder, private prodService:ProductService,private router :Router,
    private http: HttpClient, private catapiservice: CategoryService,private popupDialog:MatDialog
    ) { 

    }
    // address:fb.group({
    //   city: ['', [Validators.required]],
    //   postalCode: ['', [Validators.required]],
    //   street: ['', [Validators.required]]
    // }),


  ngOnInit(): void {

    this.catapiservice.GetAllCategories().subscribe(catlist=>{this.categoryList=catlist});
   this.prodService.GetAllProducts().subscribe(all=>console.log(all))
    this.productForm=this.formBuilder.group({

      productName: ['', Validators.required],
      productQuantity: ['', Validators.required],
      category : ['',Validators.required],
      price :['',Validators.required],
      priceAfterDiscount :['',Validators.required],
      description :['',Validators.required],
      hasDiscount :['',Validators.required],
      colors :this.formBuilder.array(
      ['']
       ),
       sizes :this.formBuilder.array([''])



    })
    console.log(this.ProductDiscount)
  }
  get colors()
  {
return this.productForm.get('colors') as FormArray;
  }
  addColor(event:any)
  {
    this.colors.push(this.formBuilder.control(''));

     event.target.classList.Add('d-none');
  }
  get sizes()
  {
return this.productForm.get('sizes') as FormArray;
  }
  addSize(event:any)
  {
    this.sizes.push(this.formBuilder.control(''));
     event.target.classList.Add('d-none');
  }
 
  HasDiscount()
  {
    this.ProductDiscount=this.productForm.value.hasDiscount;
    console.log(this.ProductDiscount)
  }
  get productQuantity()
  {
    return this.productForm.controls['productQuantity'];
  }
  get productName()
  {
    return this.productForm.controls['productName'];
  }
  get category()
  {
    return this.productForm.controls['category'];
  }
  get price()
  {
    return this.productForm.controls['price'];
  }
  get priceAfterDiscount()
  {
    return this.productForm.controls['priceAfterDiscount'];
  }
  get description()
  {
    return this.productForm.controls['description'];
  }
  get hasDiscount()
  {
    return this.productForm.controls['hasDiscount'];
  }
 
  addProduct(){
    this.Newproduct.name=this.productForm.value.productName;
    this.Newproduct.categoryid=this.productForm.value.category;
    this.Newproduct.price=this.productForm.value.price;
    this.Newproduct.quantity=this.productForm.value.productQuantity;
   this.Newproduct.description=this.productForm.value.description;
    this.Newproduct.priceAfterDiscount=this.productForm.value.priceAfterDiscount;
    this.Newproduct.hasDiscount=this.productForm.value.hasDiscount;
     
    // console.log(this.productForm.value.colors.length)
let ColorList:any=[];
let SizeList:any=[];
    for (let index = 0; index < this.productForm.value.colors.length; index++) {
     ColorList.push({name:this.productForm.value.colors[index]});
    }
   
    for (let index = 0; index < this.productForm.value.sizes.length; index++) {
      SizeList.push({name:this.productForm.value.sizes[index]});

    }
    this.Newproduct.colors=ColorList;
    this.Newproduct.sizes=SizeList;;

   
   this.router.navigate(['/products']);
    this.prodService.AddNewProduct(this.Newproduct).subscribe(p=>{
     

console.log(p)

    });
    this.alert=true;

  }


  uploadFile = (files:any,file:string) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
  
    this.http.post(`${environment.BaseAPIURL}/Product/uploadImage`,formData, {reportProgress: true, observe: 'events'})
    .subscribe({
      next: (event) => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded); 
      else if (event.type === HttpEventType.Response) {
        console.log(JSON.stringify(event.body));
        console.log(file);
        this.Newproduct.image=file.split('\\')[2];
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
      }
    },
    error: (err: HttpErrorResponse) => console.log(err)
  });
  



}

}
