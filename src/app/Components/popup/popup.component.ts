import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/Models/iproduct';
import { ICategory } from 'src/app/Models/icategory';
import { EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  progress: number=0;
  message: string='';
  @Output() public onUploadFinished = new EventEmitter();
productForm !: FormGroup;
Newproduct :IProduct={} as IProduct
categoryList : ICategory[]=[];

selectedCategory :number =0;

  constructor(private formBuilder:FormBuilder, private prodService:ProductService,private router :Router,
    private http: HttpClient, private catapiservice: CategoryService
    ) { 

    }

  ngOnInit(): void {

    this.catapiservice.GetAllCategories().subscribe(catlist=>{this.categoryList=catlist});

    this.productForm=this.formBuilder.group({

      productName: ['', Validators.required],
      productQuantity: ['', Validators.required],
      category : ['',Validators.required],
      price :['',Validators.required],

    })
  }
  // addProduct(){
  //   this.Newproduct.name=this.productForm.value.productName;
  //   this.Newproduct.categoryid=this.productForm.value.category;
  //   this.Newproduct.price=this.productForm.value.price;
  //   this.Newproduct.quantity=this.productForm.value.productQuantity;
  //   this.prodService.AddNewProduct(this.Newproduct).subscribe(p=>{
  //   this.router.navigate(['/products']);
  //   });
  //   console.log(this.productForm.value);

  // }
  addProduct(){
    this.Newproduct.name=this.productForm.value.productName;
    this.Newproduct.categoryid=this.productForm.value.category;
    this.Newproduct.price=this.productForm.value.price;
    this.Newproduct.quantity=this.productForm.value.productQuantity;
    this.prodService.AddNewProduct(this.Newproduct).subscribe(p=>{
    this.router.navigate(['/products']);
    });
    console.log(this.productForm.value);

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
        this.progress = Math.round(100 * event.loaded); //   / event.total
      else if (event.type === HttpEventType.Response) {
     // this.Newproduct.image=JSON.stringify(event.body).split('\\')[2];
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
