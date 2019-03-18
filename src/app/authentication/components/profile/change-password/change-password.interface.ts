import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup } from '@angular/forms';

export interface IChangePasswordComponent {
  modalRef: BsModalRef;
  form: FormGroup;

  onSubmit();
}

export interface IChangePassword {
  old_password: string;
  new_password: string;
}