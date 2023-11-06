import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { AuthenticationService } from '../../core/services/authentication.service';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
  ) {}
}
