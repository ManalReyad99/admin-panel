import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAdmin } from '../Models/iadmin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient:HttpClient) { }


  GetAllAdmins():Observable<IAdmin[]>
  {
    return this.httpClient.get<IAdmin[]>(`${environment.BaseAPIURL}/Admin`);
  }
AddNewAdmin(newAdmin:IAdmin):Observable<IAdmin>
{
  return this.httpClient.post<IAdmin>(`${environment.BaseAPIURL}/Admin`,JSON.stringify(newAdmin));

}
EditAdmin(id:number,updatedAdmin):Observable<IAdmin>
{
  return this.httpClient.put<IAdmin>(`${environment.BaseAPIURL}/Admin/${id}`,JSON.stringify(updatedAdmin));

}

DeleteAdmin(id:number):Observable<IAdmin>
{
  return this.httpClient.delete<IAdmin>(`${environment.BaseAPIURL}/Admin/${id}`);

}

}
