import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ActivationAccountComponent } from './components/activation-account/activation-account.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'logowanie', component: LoginComponent },
  { path: 'rejestracja', component: RegisterComponent },
  { path: 'aktywuj/:uid', component: ActivationAccountComponent },
  { path: 'odzyskaj-haslo', component: RecoveryPasswordComponent },
  { path: 'odzyskaj-haslo/:uid', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
