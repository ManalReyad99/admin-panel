import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { environment } from 'src/environments/environment';

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
progress: number=0;
message: string='';
@Output() public onUploadFinished = new EventEmitter();
EditProduct=new FormGroup({
  name:new FormControl(''),
  description:new FormControl(''),
  price:new FormControl(''),
  quantity:new FormControl(''),
  image :new FormControl(''),
  categoryId:new FormControl('')
});


  constructor(private productService :ProductService,
    private router:ActivatedRoute,private formBuilder:FormBuilder,
    private categoryService :CategoryService,
    private http: HttpClient ) {
   
   }

  ngOnInit(): void {
    this.categoryService.GetAllCategories().subscribe((result)=>{
      this.CategoryList=result;
    });

    console.log(this.router.snapshot.params.id);

this.productService.GetCurrentProductData(this.router.snapshot.params.id).subscribe((result)=>{

  this.EditProduct=new FormGroup({
    name:new FormControl(result['name']),
    description:new FormControl(result['description']),
    price:new FormControl(result['price']),
    quantity:new FormControl(result['quantity']),
    image :new FormControl(result['image']),
    categoryId:new FormControl(result['categoryId'])
});


})
   
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
      this.EditProduct.value.image=file.split('\\')[2];
      this.message = 'Upload success.';
      this.onUploadFinished.emit(event.body);
    }
  },
  error: (err: HttpErrorResponse) => console.log(err)
});




}

Edit(){
  console.log(this.EditProduct.value);
  console.log(this.router.snapshot.params.id);
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