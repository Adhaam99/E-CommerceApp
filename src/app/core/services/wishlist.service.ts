import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishListCounter : BehaviorSubject <number> = new BehaviorSubject(0)

  constructor(private _HttpClient: HttpClient) {}

  addToWishlist = (productId: string): Observable<any> => {
    return this._HttpClient.post(
      `${baseUrl}api/v1/wishlist`,
      { productId }
    );
  };

  removeFromWishlist = (productId: string): Observable<any> => {
    return this._HttpClient.delete(
      `${baseUrl}api/v1/wishlist/${productId}`
    );
  };

  getWishlist = (): Observable<any> => {
    return this._HttpClient.get(
      `${baseUrl}api/v1/wishlist`
    );
  };

}
