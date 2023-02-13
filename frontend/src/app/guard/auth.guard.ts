import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../service/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router, private tostr: ToastrService) {
  }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.service.isloggedin()) {
        return true;
      } else {
        this.router.navigate(['login']).then(r => this.tostr.warning('Please login to continue'));
        return false;
      }
  }
}
