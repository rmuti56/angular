import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthenService } from '../services/authen.service';
import { AppURL } from '../app.url';
import { AuthURL } from '../authentication/authentication.url';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticationGuard implements CanActivate {
  constructor(
    private authen: AuthenService,
    private router: Router
  ) {

  }

  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authen.getAuthenticated()) {
      this.router.navigate(['/', AppURL.Authen, AuthURL.Profile]);
      return false;
    }
    return true;
  }
}