
import { Injectable } from '@angular/core';
import {
CanActivate,
CanActivateChild,
CanLoad,
Route,
UrlSegment,
ActivatedRouteSnapshot,
RouterStateSnapshot,
UrlTree,
Router
} from '@angular/router';

import { Observable } from 'rxjs';

import { LoginServiceService } from './login-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private authservice: LoginServiceService
  ) {

  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('chamada de autenticação!');
      console.log("Guard teste login:",this.authservice.isLoggedIn());
      console.log(localStorage.getItem("expires_at"));

      if(this.authservice.isLoggedIn()) {
        let experation = this.authservice.getExpiration()
        if(experation != null)
          console.log("Guard", experation.utc().format());
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
