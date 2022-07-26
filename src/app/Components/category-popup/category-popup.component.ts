import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { CategoryService } from 'src/app/Services/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-popup',
  templateUrl: './category-popup.component.html',
  styleUrls: ['./category-popup.component.scss']
})
export class CategoryPopupComponent implements OnInit {
  progress: number=0;
  message: string='';
  newCategory:ICategory= {} as ICategory;
  alert:boolean=false;
  @Output() public onUploadFinished = new EventEmitter();
categoryForm !: FormGroup;
errorMsg:null|string
  constructor(private formBuilder:FormBuilder,private router :Router,private actRout:ActivatedRoute,
    private http: HttpClient, private catapiservice: CategoryService) { 
    
    }

  ngOnInit(): void {


    this.categoryForm=this.formBuilder.group({

      categoryName: ['', Validators.required],
    })
  }

 
   
  
  addCategory()
  {
    this.newCategory.name=this.categoryForm.value.categoryName;
    this.catapiservice.AddNewCategory(this.newCategory).subscribe(p=>{
    //window.location.reload();

    });
    console.log(this.categoryForm.value);
    this.alert=true;


  }
  reload() {
    console.log("Called");

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/categories'], { relativeTo: this.actRout });
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
       this.newCategory.image=file.split('\\')[2];
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
      }
    },
    error: (err: HttpErrorResponse) => console.log(err)
  });

}



}
