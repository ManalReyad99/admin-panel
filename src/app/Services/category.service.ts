import { HttpClient } from '@angular/common/http';
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
return this.httpClient.post<ICategory>(`${environment.BaseAPIURL}/Category`,JSON.stringify(newCategory));
}
}
