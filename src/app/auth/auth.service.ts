import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private _isAuthenticated:boolean = true;
 private _userId:string='abz';

  constructor() { }

  get isAuthenticated(){
    return this._isAuthenticated;
  }

  get userId(){
    return this._userId;
  }

  login(){
    this._isAuthenticated = true;
  }

  logout(){
    this._isAuthenticated = false;
  }
}
