import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { }

  getCategories = ():Observable<any>=>{
    return this._HttpClient.get(`${baseUrl}api/v1/categories`)
  }

  getSpecificCategorey = (categoryId:string | null):Observable<any>=>{
    return this._HttpClient.get(`${baseUrl}api/v1/products?category[in]=${categoryId}`)
  }
}
