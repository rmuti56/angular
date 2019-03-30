import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { IRoleAccount, AccountService } from '../shareds/services/account.service';
import { AuthenService } from '../services/authen.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  constructor(
    private authen: AuthenService,
    private router: Router,
    private account: AccountService,
  ) {

  }

  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean>((resolve, reject) => {
      const roles: IRoleAccount[] = next.data.roles;
      //console.log(roles) รับค่าที่ยอมรับให้เข้าหน้านั้นๆได้
      this.account.getUserLogin(this.authen.getAuthenticated())
        .then(userlogin => {
          if (roles.filter(item => item == userlogin.role).length > 0)
            resolve(true) //ถ้ามีค่าที่ตรงกับเงื่อนไขอนุญาติให้เข้าได้
          else
            resolve(false);
        })
        .catch(() => {
          resolve(false)
        })
    })
  }
}
