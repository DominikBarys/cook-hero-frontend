import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ResetPasswordForm } from '../../../core/models/user/user.forms.models';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-recovery-password-form',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup<ResetPasswordForm> =
    this.formService.initResetPasswordForm();
  uuid = '';
  resetPasswordErrorMessage: string | null = null;

  get controls() {
    return this.resetPasswordForm.controls;
  }

  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private notifierService: NotifierService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.uuid = param.get('uuid') || '';
      },
    });
  }

  getErrorMessage(formControl: FormControl<string>) {
    return this.formService.getErrorMessage(formControl);
  }

  onResetPassword() {
    const { password, repeatPassword } = this.resetPasswordForm.getRawValue();

    this.authenticationService
      .passwordReset({ password, uuid: this.uuid })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.notifierService.notify('success', 'Hasło zostało zmienione');
        },
        error: (err) => {
          this.resetPasswordErrorMessage = err;
        },
      });
  }
}
