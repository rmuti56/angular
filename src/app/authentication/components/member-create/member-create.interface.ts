import { IRoleAccount } from 'src/app/shareds/services/account.service';
import { FormGroup } from '@angular/forms';

export interface IMemberCreateComponent {
  positionItem: string[];
  roleItem: IRoleAccount[];
  form: FormGroup;

  onSubmit(): void;
  getRoleName(role: IRoleAccount): string;
  onConvertImage(input: HTMLInputElement);

}