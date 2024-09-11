import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Token } from '../interfaces/token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: Token = {} as Token;

  constructor(private _HttpClient:HttpClient, private _Router:Router){}

  signUp(data: object): Observable<any> {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signup', data);
  }

  signIn(data: object): Observable<any> {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signin', data);
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }

  logOut(): void {
    localStorage.removeItem('userToken');

    this.userData = {} as Token;

    this._Router.navigate(['/login']);
  }

  setEmailVerify(email: object): Observable<any> {
    return this._HttpClient.post(
      `${baseUrl}api/v1/auth/forgotPasswords`,
      email
    );
  }

  setCodeVerify(code: object): Observable<any> {
    return this._HttpClient.post(`${baseUrl}api/v1/auth/verifyResetCode`, code);
  }

  setNewPassword(data: object): Observable<any> {
    return this._HttpClient.put(`${baseUrl}api/v1/auth/resetPassword`, data);
  }
}
