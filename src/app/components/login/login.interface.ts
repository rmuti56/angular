import { FormGroup } from '@angular/forms';

export interface IloginComponent {
  Url: any;
  form: FormGroup;
  onSubmit(); void;
}

export interface Iloign {
  email: string;
  password: string;
  remember: boolean;
}