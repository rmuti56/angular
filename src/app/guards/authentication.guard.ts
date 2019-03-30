import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthenService } from '../services/authen.service';
import { AppURL } from '../app.url';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
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
      return true;
    }
    this.router.navigate(['/', AppURL.Login, { returnURL: state.url }]);
    return false;
  }
}
