import { NgModule } from '@angular/core';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { ActivationAccountComponent } from './components/activation-account/activation-account.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ActivationAccountComponent,
    RecoveryPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
  ],
  imports: [SharedModule, AuthenticationRoutingModule],
})
export class AuthenticationModule {}
