import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { BehaviorSubject, from } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';

import { Plugins } from "@capacitor/core";


export interface AuthResponseData {
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string
}

@Injectable({
  providedIn: 'root'
})






export class AuthService  implements OnDestroy {
 private _user = new BehaviorSubject<User>(null)
 private _isAuthenticated:boolean = false;
 private _userId:string=null;
 private activeLogoutTimer: any;

  constructor(private _http:HttpClient) { }

  get isAuthenticated(){
    return this._user.asObservable().pipe(map((user)=>{
      if(user){
        return !!user.token
      }else{
        return false;
      }
    }));
  }

  get userId(){
    return this._user.asObservable().pipe(map(user=>{
      if(user){
        return user.id
      }else{
        return null
      }
    }))
  }

  signUp(email:string,password:string){
    return this._http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPI_KEY}`,{
      email:email,
      password:password,
      returnSecureToken	:true
    }).pipe(tap(this.setUserData.bind(this)))
  }

  login(email:string,password:string){
   
    return this._http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPI_KEY}`,{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(tap(this.setUserData.bind(this)))
  }

  logout(){
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this._user.next(null);
    Plugins.Storage.remove({
      key:'authData'
    })
  }

  autoLogin(){
    return from (Plugins.Storage.get({
      key:'authData'
    })).pipe(map(storeData=>{
      if(!storeData || !storeData.value){
        return null
      }
      let parsedData = JSON.parse(storeData.value) as {
        token:string,
        email:string,
        userId:string,
        tokenExpirationTime:string,
      }
      let newExpirationDate = new Date(parsedData.tokenExpirationTime)
      if(newExpirationDate <= new Date()){
        return null;
      }
      const user = new User(parsedData.userId , parsedData.email , parsedData.token , newExpirationDate)
      return user
    }),tap(user=>{
      if(user){
        this._user.next(user);
        this.autoLogout(user.tokenDuration);
      }
    }),map(user=>{
      console.log(user)
      return !!user
    }))
  }

  private setUserData(userData:AuthResponseData){
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    const user = new User(
      userData.localId,
      userData.email,
      userData.idToken,
      expirationTime
    );
    this.autoLogout(user.tokenDuration);
      this._user.next(user)
      this.storeAuthData(userData.localId , userData.refreshToken , expirationTime.toISOString(),userData.email);
  }

  private storeAuthData(userId:string,token:string,tokenExpirationTime:string,email:string){
    const user=JSON.stringify({
      userId:userId,
      token:token,
      tokenExpirationTime:tokenExpirationTime,
      email:email
    })
    Plugins.Storage.set({
      key:'authData',
      value:user
    })
  }

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }
}
