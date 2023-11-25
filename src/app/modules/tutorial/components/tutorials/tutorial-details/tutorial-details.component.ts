import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { TutorialsService } from '../../../../core/services/tutorials.service';
import {
  Page,
  Tutorial,
} from '../../../../core/models/tutorial/tutorial.models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NotifierService } from 'angular-notifier';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/app.reducer';
import { User } from '../../../../core/models/authentication/authentication.models';
import { selectAuthenticationUser } from '../../../../authentication/store/authentication.selectors';
import { PageService } from '../../../../core/services/page.service';

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

  pages: Page[] = [];
  pageIterator = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tutorialsService: TutorialsService,
    private domSanitizer: DomSanitizer,
    private notifierService: NotifierService,
    private router: Router,
    private store: Store<AppState>,
    private pageService: PageService,
  ) {}

  ngOnInit(): void {
    this.pageIterator = 1;
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
          try {
            this.parameters = JSON.parse(tutorial.parameters);
          } catch (err) {
            this.parameters = null;
          }
          // Call getPages() only after the tutorial is loaded
          this.pageService.getPages(this.tutorial!.shortId).subscribe({
            next: (pages) => {
              this.pages = [...pages];
              this.getPageContent(this.pageIterator);
            },
            error: (err) => {
              console.log(err);
            },
          });
          // More code if needed within this subscribe block
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

  getPageContent(pageNumber: number) {
    const currentPage = this.pages.find(
      (page) => page.pageNumber === pageNumber,
    );
    this.htmlContent = this.domSanitizer.bypassSecurityTrustHtml(
      currentPage!.htmlContent,
    );
  }

  nextPage() {
    this.pageIterator++;
    if (this.pageIterator > this.pages.length) {
      this.pageIterator = this.pages.length;
    }
    this.getPageContent(this.pageIterator);
  }

  previousPage() {
    this.pageIterator--;
    if (this.pageIterator < 1) {
      this.pageIterator = 1;
    }
    this.getPageContent(this.pageIterator);
  }
}
