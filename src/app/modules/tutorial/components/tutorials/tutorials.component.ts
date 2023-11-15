import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { TutorialsService } from '../../../core/services/tutorials.service';
import { SimpleTutorial } from '../../../core/models/tutorial/tutorial.models';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss'],
})
export class TutorialsComponent implements AfterViewInit, OnDestroy {
  //after view init zeby pobrac z szablonu html mat paginator
  simpleTutorials: SimpleTutorial[] = [];
  totalCount = 0;
  sub$ = new Subscription();
  tutorialsErrorMessage: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tutorialService: TutorialsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    this.tutorialService.getTutorials().subscribe({
      next: ({ tutorials, totalCount }) => {
        console.log(tutorials);
        this.simpleTutorials = [...tutorials];
        this.totalCount = totalCount;
      },
    });

    this.activatedRoute.queryParamMap
      .pipe(
        switchMap((queryMap) => {
          const page = queryMap.get('page') ? Number(queryMap.get('page')) : 1;
          const itemsPerPage = queryMap.get('ilosc')
            ? Number(queryMap.get('ilosc'))
            : this.paginator.pageSize;
          //todo mniej wiecej tutaj dodac spinner do ladowania produktow, tutaj zaczyna sie pobieranie
          return this.tutorialService.getTutorials(page, itemsPerPage);
        }),
        map(({ tutorials, totalCount }) => {
          this.totalCount = totalCount;
          this.simpleTutorials = tutorials;
          //todo tutaj gdzies sie konczy pobieranie
        }),
      )
      .subscribe({
        error: (err) => {
          this.tutorialsErrorMessage = err;
        },
      });

    this.sub$.add(
      this.paginator.page
        .pipe(
          startWith({}),
          switchMap(() => {
            const pageIndex = this.paginator.pageIndex + 1;
            const itemsPerPage = this.paginator.pageSize;

            return this.tutorialService.getTutorials(pageIndex, itemsPerPage);
          }),
          map(({ tutorials, totalCount }) => {
            this.totalCount = totalCount;
            this.simpleTutorials = tutorials;
          }),
        )
        .subscribe({
          next: () => {
            const pageIndex = this.paginator.pageIndex + 1;
            const itemsPerPage = this.paginator.pageSize;

            this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParams: { page: pageIndex, itemsPerPage: itemsPerPage },
            });
          },
        }),
    );
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
