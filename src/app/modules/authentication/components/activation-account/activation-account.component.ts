import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-activation-account',
  templateUrl: './activation-account.component.html',
  styleUrls: ['./activation-account.component.scss'],
})
export class ActivationAccountComponent implements OnInit {
  activationAccountErrorMessage: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private notifierService: NotifierService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) =>
          this.authenticationService.activateAccount(
            params.get('uid') as string,
          ),
        ),
      )
      .subscribe({
        next: (response) => {
          this.router.navigate(['/logowanie']);
          this.notifierService.notify('success', response.message);
        },
        error: (err) => {
          this.router.navigate(['/']);
        },
      });
  }
}
