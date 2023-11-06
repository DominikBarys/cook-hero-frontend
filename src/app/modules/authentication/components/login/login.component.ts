import { Component } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginForm } from '../../../core/models/user/user.forms.models';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup<LoginForm> = this.formService.initLoginForm();

  get controls() {
    return this.loginForm.controls;
  }
  constructor(private formService: FormService) {}

  getErrorMessage(formControl: FormControl): string {
    return this.formService.getErrorMessage(formControl);
  }
}
