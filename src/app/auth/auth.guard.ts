import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PlaceService } from '../places/place.service';
import { AuthService } from './auth.service';
import { take, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private  _authservice:AuthService , private router:Router){

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this._authservice.isAuthenticated.pipe(take(1),switchMap(isAuthenticated=>{
      if(isAuthenticated){
        return this._authservice.autoLogin()
      }else{
        return of(isAuthenticated)
      }
    }),tap((isAuthenticated)=>{
      
      if(!isAuthenticated){
        this.router.navigateByUrl('/auth');
      }
    }));
  }
}
