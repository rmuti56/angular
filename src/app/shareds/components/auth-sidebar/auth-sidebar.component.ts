import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { IAuthSidebarComponent } from './auth.sidebar.interface';
import { IAccount, AccountService, IRoleAccount } from '../../services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from '../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
declare let App;
@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})
export class AuthSidebarComponent implements OnInit, IAuthSidebarComponent {

  isLoading = false;
  AppURL = AppURL;
  AuthURL = AuthURL;
  UserLogin: IAccount;
  UserResult;
  Role = IRoleAccount;
  lange;
  langeJson;

  homeTxt;
  selectLange;

  currentUrl;
  splitUrl;
  constructor(
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private language: LanguageService,
    private router: ActivatedRoute,
    private route: Router
  ) {
  }

  ngOnInit() {
    this.initialLoadUserLogin();
    // console.log(this.router.snapshot)
    // this.lange = this.router.snapshot.children[0].params['lange'];
    // this.langeJson = this.language.language();
    // this.homeTxt = this.lange === 'th' ? this.langeJson.home.th : this.langeJson.home.en;

    // this.currentUrl = this.route.url.split('/')
    // this.splitUrl = this.currentUrl.slice(0, this.currentUrl.length - 1).join('/');
    // this.selectLange = this.currentUrl[this.currentUrl.length - 1];
  }

  changeLange() {
    // this.route.navigate(['/' + this.splitUrl + '/' + this.selectLange]).then(() => {
    //   window.location.reload();
    // })
  }

  //โหลดข้อมูล user ที่เข้าสู่ระบบ จาก token
  initialLoadUserLogin() {
    this.isLoading = true;
    this.UserLogin = this.account.UserLogin;
    this.UserResult = this.UserLogin;
    if (this.UserLogin.email) {
      setTimeout(() => {
        App.initialLoadPage()
      }, 100);
      this.isLoading = false;
    } else {

      this.account.getUserLogin(this.authen.getAuthenticated())
        .then(userLogin => {
          App.initialLoadPage();
          this.UserLogin = userLogin;
          this.isLoading = false;
        })
        .catch(err => {
          this.alert.notify(err.Message);
          // this.authen.clearAuthenticated();
          // this.router.navigate(['/', AppURL.Login]);
        });
    }
  }
}
