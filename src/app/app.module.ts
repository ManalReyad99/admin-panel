import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components//header/header.component';
import { HomeComponent } from './Components//home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProductsComponent } from './Components/products/products.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParentLayoutComponent } from './Components/parent-layout/parent-layout.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './Components/popup/popup.component';
import { MatDialogModule} from '@angular/material/dialog'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { EditComponent } from './Components/edit/edit.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { CategoryPopupComponent } from './Components/category-popup/category-popup.component';
import { SuccessActionComponent } from './Components/success-action/success-action.component';
import { EditCategoryComponent } from './Components/edit-category/edit-category.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    ReportsComponent,
    ParentLayoutComponent,
    PageNotFoundComponent,
    PopupComponent,
    EditComponent,
    CategoriesComponent,
    CategoryPopupComponent,
    SuccessActionComponent,
    EditCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
     MatInputModule,
     MatSelectModule,
     MatDatepickerModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
