import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICategory } from 'src/app/Models/icategory';
import { CategoryService } from 'src/app/Services/category.service';
import { CategoryPopupComponent } from '../category-popup/category-popup.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { SuccessActionComponent } from '../success-action/success-action.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
CategoryList:ICategory[]=[];
  constructor(private categoryService:CategoryService,private popupDialog:MatDialog) { }

  ngOnInit(): void {

    this.categoryService.GetAllCategories().subscribe(allCategories =>
    {this.CategoryList=allCategories;})
  }
  Delete(categoryID:number)
  {
    this.categoryService.RemoveCategory(categoryID).subscribe(

    )
    this.popupDialog.open(SuccessActionComponent, {
      width : '20%'
     });

  }
  openDialog(){
    this.popupDialog.open(CategoryPopupComponent, {
      width : '35%'
     });
  }

}
