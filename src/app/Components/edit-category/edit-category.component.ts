import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { CategoryService } from 'src/app/Services/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  progress: number=0;
  message: string='';
  newCategory:ICategory= {} as ICategory;
  alert:boolean=false;
  @Output() public onUploadFinished = new EventEmitter();
categoryForm !: FormGroup;
EditCategory=new FormGroup({
  name:new FormControl(''),
  image:new FormControl('')
}
  )
  constructor(private formBuilder:FormBuilder,private router :Router,private router2:ActivatedRoute,
    private http: HttpClient, private catapiservice: CategoryService) { }

  ngOnInit(): void {


    this.catapiservice.GetCurrentCategoryData(this.router2.snapshot.params.id).subscribe((result)=>{

      this.EditCategory=new FormGroup({
        name:new FormControl(result['name']),

       
        image :new FormControl(result['image']),
  });
    
    
    })
  }

  editCategory()
  {
    console.log(this.router2.snapshot.params.id);
  this.catapiservice.EditCategory(this.router2.snapshot.params.id,this.EditCategory.value).subscribe((result=>{
  }))
  this.alert=true;

  }
 
    
  CloseAlert()
  {
    this.alert=false
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
       // this.newCategory.image=file.split('\\')[2];
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
      }
    },
    error: (err: HttpErrorResponse) => console.log(err)
  });

}

}
