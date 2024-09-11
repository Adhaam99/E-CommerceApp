import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartCounter:BehaviorSubject<number> = new BehaviorSubject(0)
  
  constructor(private _HttpClient: HttpClient) {}

  addToCart = (productId: string): Observable<any> => {
    return this._HttpClient.post(
      `${baseUrl}api/v1/cart`,
      { productId }
    );
  };

  getUserCart = (): Observable<any> => {
    return this._HttpClient.get(`${baseUrl}api/v1/cart`);
  };

  removeCartItem = (id: string): Observable<any> => {
    return this._HttpClient.delete(`${baseUrl}api/v1/cart/${id}`);
  };

  updateCartProductQTY = (id:string, count: number): Observable<any> => {
    return this._HttpClient.put(`${baseUrl}api/v1/cart/${id}`, { count } );
  };

  clearCart = (): Observable<any> => {
    return this._HttpClient.delete(`${baseUrl}api/v1/cart`);
  };

}
