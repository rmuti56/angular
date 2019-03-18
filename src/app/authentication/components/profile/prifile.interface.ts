import { FormGroup } from '@angular/forms';
import { TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

export interface IProfileComponent {
  positionItem: any[];
  form: FormGroup;
  onSubmit(): void;
  onConvertImage(inputFile: HTMLInputElement): void;
  openModal(template: TemplateRef<any>);
  modalRef: BsModalRef;
}

export interface IProfile {
  firstname: string;
  lastname: string;
  position: string;
  image: string;
}