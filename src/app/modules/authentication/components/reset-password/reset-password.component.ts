import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ResetPasswordForm } from '../../../core/models/auth.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recovery-password-form',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup<ResetPasswordForm> =
    this.formService.initResetPasswordForm();

  get controls() {
    return this.resetPasswordForm.controls;
  }

  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        console.log(param.get('uid'));
      },
    });
  }

  getErrorMessage(formControl: FormControl<string>) {
    return this.formService.getErrorMessage(formControl);
  }
}
