import { Component } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { RecoveryPasswordForm } from '../../../core/models/auth.models';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent {
  recoveryPasswordForm: FormGroup<RecoveryPasswordForm> =
    this.formService.initRecoveryPasswordForm();

  get controls() {
    return this.recoveryPasswordForm.controls;
  }

  constructor(private formService: FormService) {}

  getErrorMessage(formControl: FormControl): string {
    return this.formService.getErrorMessage(formControl);
  }
}
