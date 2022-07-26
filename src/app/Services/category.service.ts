import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategory } from '../Models/icategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }

  GetAllCategories():Observable<ICategory[]>
{
  return this.httpClient.get<ICategory[]>(`${environment.BaseAPIURL}/Category`);
}
AddNewCategory(newCategory:ICategory):Observable<ICategory>
{
return this.httpClient.post<ICategory>(`${environment.BaseAPIURL}/Category`,JSON.stringify(newCategory),{
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })});
}
EditCategory(categoryId:number,newCategory:ICategory):Observable<ICategory>
{
  return this.httpClient.put<ICategory>(`${environment.BaseAPIURL}/Category/${categoryId}`,JSON.stringify(newCategory),{
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })});

}

RemoveCategory(categoryId:number):Observable<ICategory>
{
  return this.httpClient.delete<ICategory>(`${environment.BaseAPIURL}/Category/${categoryId}`);


}

GetCurrentCategoryData(CategoryId:number):Observable<ICategory>
  {

   return this.httpClient.get<ICategory>(`${environment.BaseAPIURL}/Category/${CategoryId}`)

  }

}
