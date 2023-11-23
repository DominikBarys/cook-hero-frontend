import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { TutorialsService } from '../../../../core/services/tutorials.service';
import { Tutorial } from '../../../../core/models/tutorial/tutorial.models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NotifierService } from 'angular-notifier';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/app.reducer';
import { User } from '../../../../core/models/authentication/authentication.models';
import { selectAuthenticationUser } from '../../../../authentication/store/authentication.selectors';

@Component({
  selector: 'app-tutorial-card-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.scss'],
})
export class TutorialDetailsComponent implements OnInit {
  tutorial: Tutorial | null = null;
  parameters: { [key: string]: string } | null = null;
  htmlContent: SafeHtml | null = null;

  user$: Observable<User | null> = this.store.select(selectAuthenticationUser);

  constructor(
    private activatedRoute: ActivatedRoute,
    private tutorialsService: TutorialsService,
    private domSanitizer: DomSanitizer,
    private notifierService: NotifierService,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap) => {
          return this.tutorialsService.getTutorial(
            paramMap.get('shortId') as string,
          );
        }),
      )
      .subscribe({
        next: (tutorial) => {
          this.tutorial = { ...tutorial };
          this.htmlContent = this.domSanitizer.bypassSecurityTrustHtml(
            tutorial.shortDescription,
          );
          try {
            this.parameters = JSON.parse(tutorial.parameters);
          } catch (err) {
            this.parameters = null;
          }
          //       console.log(this.parameters);
        },
      });
  }

  isAdmin(role: string): boolean {
    return role === 'ADMIN';
  }

  isAuthor(username: string): boolean {
    return username === this.tutorial!.authorDTO.username;
  }

  onDeleteTutorial() {
    this.tutorialsService.deleteTutorial(this.tutorial!.shortId).subscribe({
      next: () => {
        this.router.navigate(['/poradniki']);
        this.notifierService.notify(
          'success',
          'Poradnik został usunięty pomyślnie',
        );
      },
      error: (err) => {
        this.notifierService.notify('error', err);
      },
    });
  }

  test() {
    //  console.log('siema');
    //  console.log(this.tutorial);
  }
}
