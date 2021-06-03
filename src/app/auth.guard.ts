import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from  '@angular/router';
import { AuthService } from './service/auth.service';



@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    let route ="login"
let user  =       JSON.parse(sessionStorage.getItem('user'));
    if (user!=null) {
      if (window.location.pathname=='/dashboard' && user.role =='student'){
       route ='home'
      } else{
        return true;
      }

    }


    // Navigate to the login page with extras
    this.router.navigate(['/'+route]);
    return false;
  }
}
