import { Component, OnInit, Input } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { IRegisterComponent } from './register.interface';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { ValidatorsService } from 'src/app/shareds/services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements IRegisterComponent {
  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private account: AccountService,
    private router: Router,
    private validators: ValidatorsService,

  ) {
    this.initialCreateFormData();
  }



  Url = AppURL;
  form: FormGroup

  //ลงทะเบียน
  onSubmit() {
    if (this.form.invalid)
      this.alert.someting_wrong();
    //ส่งข้อมูลหา server
    console.log(this.form.valid)
    this.account.onRegister(this.form.value)
      .then(res => {
        this.alert.notify('ลงทะเบียนสำเร็จ', 'info');
        this.router.navigate(['/', AppURL.Login]);
      })
      .catch(err => this.alert.notify(err.Message));
  }

  private initialCreateFormData() {
    //สร้างฟอร์ม
    this.form = this.builder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[A-z0-9]{6,15}$/)]],
      cpassword: ['', [Validators.required, this.validators.comparePassword('password')]]
    });
  }

}
