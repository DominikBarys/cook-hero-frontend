import { Component } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { RecoveryPasswordForm } from '../../../core/models/forms/user.forms.models';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent {
  recoveryPasswordForm: FormGroup<RecoveryPasswordForm> =
    this.formService.initRecoveryPasswordForm();
  recoveryPasswordErrorMessage: string | null = null;

  get controls() {
    return this.recoveryPasswordForm.controls;
  }

  constructor(
    private formService: FormService,
    private authenticationService: AuthenticationService,
    private notifierService: NotifierService,
  ) {}

  getErrorMessage(formControl: FormControl): string {
    return this.formService.getErrorMessage(formControl);
  }

  onRecoveryPassword() {
    this.authenticationService
      .passwordRecovery(this.recoveryPasswordForm.getRawValue())
      .subscribe({
        next: () => {
          this.notifierService.notify(
            'success',
            'Sprawdź swój email by zresetować hasło',
          );
        },
        error: (err) => {
          this.notifierService.notify('warning', err);
        },
      });
  }
}
