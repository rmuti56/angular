import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProfileComponent } from './prifile.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SharedsService } from 'src/app/shareds/services/shareds.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {

  constructor(
    private buider: FormBuilder,
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private modalService: BsModalService,
    private shareds: SharedsService,


  ) {
    this.initialCreateFormData();
    this.initialLoadUpdateForData();
    //เพิ่ม position
    this.positionItem = this.shareds.positionItem;
  }

  form: FormGroup;
  modalRef: BsModalRef;

  positionItem: any[] = [];

  // บันทึกข้อมูล
  onSubmit() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.account
      .onUpdateProfile(this.authen.getAuthenticated(), this.form.value)
      .then(() => {
        this.alert.notify('แก้ไขข้อมูลสำเร็จ', 'info')
      })
      .catch(err => this.alert.notify(err.Message));

  }

  // แปลงรูปภาพเป็น Base64
  onConvertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image'];
    this.shareds
      .onConvertImage(input)
      .then(base64 => {
        imageControl.setValue(base64);
      })
      .catch(err => {
        input.value = null;
        imageControl.setValue(null)
        this.alert.notify(err.Message);
      })
  }

  // เปิด Modal dialog
  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template);
  }

  //สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.buider.group({
      email: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['', Validators.required],
      image: [null],
    })
    //disable email
    this.form.get('email').disable();
  }

  //โหลดข้อมูลใหม่พร้อมกับ update form data
  private initialLoadUpdateForData() {
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(user => {
        this.form.controls['email'].setValue(user.email);
        this.form.controls['firstname'].setValue(user.firstname);
        this.form.controls['lastname'].setValue(user.lastname);
        this.form.controls['position'].setValue(user.position);
        this.form.controls['image'].setValue(user.image);
      })
      .catch(err => {
        this.alert.notify(err.Message);
      });
  }
}
