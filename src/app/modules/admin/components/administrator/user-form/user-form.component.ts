import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../../core/services/form.service';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ManageUserForm } from '../../../../core/models/forms/user.forms.models';
import { UserInterface } from '../../../../core/models/authentication/authentication.models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  deleteUserForm: FormGroup<ManageUserForm> =
    this.formService.initManageUserForm();
  manageUserForm: FormGroup<ManageUserForm> =
    this.formService.initManageUserForm();
  users: UserInterface[] = [];

  constructor(
    private formService: FormService,
    private authenticationService: AuthenticationService,
    private notifierService: NotifierService,
  ) {}

  onDeleteUser(control: FormControl<string>) {
    const user = this.users.find(
      (user) => user.username === control.getRawValue(),
    );
    if (user) {
      this.authenticationService.deleteUser(user.uuid).subscribe({
        next: () => {
          this.notifierService.notify('success', 'Użytkownik został usunięty');
          this.deleteUserForm.reset();
        },
        error: (err) => {
          this.notifierService.notify('error', err);
        },
      });
    } else {
      this.notifierService.notify(
        'warning',
        'Użytkownik o podanej nazwie nie istnieje.',
      );
    }
  }

  onManageUser(control: FormControl<string>, role: string) {
    const user = this.users.find(
      (user) => user.username === control.getRawValue(),
    );
    if (user) {
      this.authenticationService.changeUserRole(user.uuid, role).subscribe({
        next: () => {
          this.notifierService.notify(
            'success',
            'Rola użytkownika została zmieniona',
          );
        },
        error: (err) => {
          this.notifierService.notify('error', err);
        },
      });
    } else {
      this.notifierService.notify(
        'warning',
        'Użytkownik o podanej nazwie nie istnieje.',
      );
    }
  }

  ngOnInit(): void {
    this.authenticationService.getAllUsers().subscribe({
      next: (users) => {
        this.users = [...users];
      },
      error: (err) => {
        this.notifierService.notify('error', err);
      },
    });
  }
}
