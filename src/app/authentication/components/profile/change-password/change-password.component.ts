import { Component, OnInit, Input } from '@angular/core';
import { IChangePasswordComponent } from './change-password.interface';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { ValidatorsService } from 'src/app/shareds/services/validators.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements IChangePasswordComponent {
  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private validators: ValidatorsService,
    private account: AccountService,
    private authen: AuthenService
  ) {
    this.initialCreateFormData();
  }
  @Input('modalRef') modalRef: BsModalRef;

  form: FormGroup;

  //เปลี่ยนรหัสผ่าน
  onSubmit() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.account
      .onChangePassword(this.authen.getAuthenticated(), this.form.value)
      .then(user => {
        console.log(user)
        this.alert.notify('เปลี่ยนรหัสผ่านเรียบร้อย', 'info')
      }
      )

      .catch(err => this.alert.notify(err.error));

  }

  //สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
      old_password: ['', [Validators.required, this.validators.isPassword]],
      new_password: ['', [Validators.required, this.validators.isPassword]],
      cnew_password: ['', [Validators.required, this.validators.isPassword, this.validators.comparePassword('new_password')]]
    });
  }
}
