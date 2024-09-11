import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }

  getProducts = ():Observable<any> => {

    return this._HttpClient.get(`${baseUrl}api/v1/products`)
  }

  getSpecificProduct = (id:string | null):Observable<any> => {

    return this._HttpClient.get(`${baseUrl}api/v1/products/${id}`)
  }
}
