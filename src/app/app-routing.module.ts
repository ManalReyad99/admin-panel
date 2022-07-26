import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './Components/categories/categories.component';
import { EditCategoryComponent } from './Components/edit-category/edit-category.component';
import { EditComponent } from './Components/edit/edit.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ParentLayoutComponent } from './Components/parent-layout/parent-layout.component';
import { ProductsComponent } from './Components/products/products.component';
import { RegisterComponent } from './Components/register/register.component';
import { ReportsComponent } from './Components/reports/reports.component';



const routes: Routes = [
 
  {path: '', component:ParentLayoutComponent, children: [
    {path:'', redirectTo:'/home', pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'reports', component: ReportsComponent },
  {path:'edit/:id',component:EditComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'editCategory/:id',component:EditCategoryComponent}

]},
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
  {path:'**', component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
