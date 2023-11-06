import { Component } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ResetPasswordForm } from '../../../core/models/auth.models';

@Component({
  selector: 'app-recovery-password-form',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup<ResetPasswordForm> =
    this.formService.initResetPasswordForm();

  get controls() {
    return this.resetPasswordForm.controls;
  }

  constructor(private formService: FormService) {}

  getErrorMessage(formControl: FormControl<string>) {
    return this.formService.getErrorMessage(formControl);
  }
}
