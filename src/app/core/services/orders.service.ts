import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl, serverUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  constructor(private _HttpClient: HttpClient) {}

  checkOut = (id: string | null, shippingAddress: object): Observable<any> => {
    return this._HttpClient.post(
      `${baseUrl}api/v1/orders/checkout-session/${id}/?url=${serverUrl}`,
      {shippingAddress}
    );
  };
}
