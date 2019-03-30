import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { IloginComponent } from './login.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { AuthenService } from 'src/app/services/authen.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements IloginComponent {
  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private router: Router,
    private account: AccountService,
    private authen: AuthenService,
    private actiavteRoute: ActivatedRoute
  ) {

    this.intialCreateFormData();
    //เก็บค่า return url เพื่อ redirect หลังจาก login
    this.actiavteRoute.params.forEach(params => {
      this.returnURL = params.returnURL || `/${AppURL.Authen}`;
    })
  }


  Url = AppURL;
  returnURL: string;
  form: FormGroup;
  void: any;
  //เข้าสู่ระบบ
  onSubmit() {
    if (this.form.invalid)
      return this.alert.someting_wrong();
    this.account.onLogin(this.form.value)
      .then(res => {
        //เก็บ session
        this.authen.setAuthenticated(res);
        // alert และ redirect หน้า
        this.alert.notify('เข้าสู่ระบบสำเร็จ', 'info');
        this.router.navigateByUrl(this.returnURL);
      })
      .catch(err => this.alert.notify(err.error));
  }

  // สร้างฟอร์ม
  private intialCreateFormData() {
    this.form = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: [true]
    });
  }
}
