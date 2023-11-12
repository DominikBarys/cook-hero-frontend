import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ActivationAccountComponent } from './components/activation-account/activation-account.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LoggedInGuard } from '../core/guards/logged-in.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { NonLoggedInGuard } from '../core/guards/non-logged-in.guard';

const routes: Routes = [
  {
    path: 'logowanie',
    component: LoginComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'rejestracja',
    component: RegisterComponent,
    canActivate: [LoggedInGuard],
  },
  { path: 'aktywuj/:uid', component: ActivationAccountComponent },
  { path: 'odzyskaj-haslo', component: RecoveryPasswordComponent },
  { path: 'odzyskaj-haslo/:uid', component: ResetPasswordComponent },
  {
    path: 'profil',
    component: ProfileComponent,
    canActivate: [NonLoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
