import { Component, OnInit } from '@angular/core';
import { AuthURL } from '../../authentication.url';
import { AppURL } from 'src/app/app.url';
import { IMemberCreateComponent } from './member-create.interface';
import { IRoleAccount } from 'src/app/shareds/services/account.service';
import { SharedsService } from 'src/app/shareds/services/shareds.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { ValidatorsService } from 'src/app/shareds/services/validators.service';


@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements IMemberCreateComponent {

  constructor(
    private shareds: SharedsService,
    private builder: FormBuilder,
    private alert: AlertService,
    private validator: ValidatorsService

  ) {
    this.positionItem = this.shareds.positionItem;
    this.initialCreateFormData();
  }

  form: FormGroup;
  positionItem: string[];
  roleItem: IRoleAccount[] = [
    IRoleAccount.Member,
    IRoleAccount.Employee,
    IRoleAccount.Admin
  ];

  //เพิ่มสมาชิก
  onSubmit() {
    if (this.form.invalid) {
      return this.alert.notify('กรุณากรอกข้อมูลให้ครบ')
    }
    console.log(this.form.value)
  }

  //แสดงข้อมูลสิทธิ์ผู้ใช้งานเป็นตัวหนังสือ
  getRoleName(role: IRoleAccount): string {
    return IRoleAccount[role];
  }

  AppURL = AppURL;
  AuthURL = AuthURL;

  //แสดงตัวอย่างภาพอัพโหลด
  onConvertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image']
    this.shareds
      .onConvertImage(input)
      .then(base64 => {
        imageControl.setValue(base64);
      }
      )
      .catch(err => {
        input.value = null;
        imageControl.setValue(null)
        this.alert.notify(err.Message)
      })
  }

  //สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
      image: [],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.validator.isPassword]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['', Validators.required],
      role: ['', Validators.required],
    })
  }
}
