import { Component, OnInit } from '@angular/core';
import { AuthURL } from '../../authentication.url';
import { AppURL } from 'src/app/app.url';
import { IMemberCreateComponent } from './member-create.interface';
import { IRoleAccount } from 'src/app/shareds/services/account.service';
import { SharedsService } from 'src/app/shareds/services/shareds.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { ValidatorsService } from 'src/app/shareds/services/validators.service';
import { MemberService } from '../../services/member.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css'],
  providers: [MemberService]
})
export class MemberCreateComponent implements IMemberCreateComponent {

  constructor(
    private shareds: SharedsService,
    private builder: FormBuilder,
    private alert: AlertService,
    private validator: ValidatorsService,
    private member: MemberService,
    private router: Router,
    private activatedRouter: ActivatedRoute

  ) {
    this.activatedRouter.params.forEach(param => {
      this.memId = param.id
    });
    this.positionItem = this.shareds.positionItem;
    this.initialCreateFormData();
    this.initialUpdateFormData();
  }



  form: FormGroup;
  memId: any;
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
    //หากเป็นการเพิ่มสมาชิกใหม่
    if (!this.memId) {
      this.member.createMember(this.form.value)
        .then(res => {
          this.alert.notify('บันทึกข้อมูลสำเร็จ', 'info')
          this.router.navigate(['', AppURL.Authen, AuthURL.Member])
        })
        .catch(err => this.alert.notify(err.error))
    } else {
      //หากเป็นการแก้ไขข้อมูลสมาชิก
      this.member.updateMember(this.memId, this.form.value)
        .then(member => {
          this.alert.notify('แก้ไขข้อมุลสำเร็จ', 'info');
          this.router.navigate(['', AppURL.Authen, AuthURL.Member])
        })
        .catch(err => this.alert.notify(err.error))
    }

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

  //แก้ไขฟอร์ม
  private initialUpdateFormData() {

    if (!this.memId) return;
    this.member.getMember(this.memId)
      .then(member => {
        //นำข้อมูลมาใส่ฟอร์ม
        const form = this.form;
        form.controls['image'].setValue(member.image);
        form.controls['email'].setValue(member.email);
        form.controls['firstname'].setValue(member.firstname);
        form.controls['lastname'].setValue(member.lastname);
        form.controls['position'].setValue(member.position);
        form.controls['role'].setValue(member.role);
        form.controls['password'].setValidators(this.validator.isPassword);
        form.controls['password'].updateValueAndValidity();
      })
      .catch(err => {
        this.alert.notify(err.error)
        this.router.navigate(['', AppURL.Authen, AuthURL.Member])
      })
  }
}
