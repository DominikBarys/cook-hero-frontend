import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TutorialsService } from '../../../core/services/tutorials.service';
import {
  Category,
  SimpleTutorial,
} from '../../../core/models/tutorial/tutorial.models';
import { MatPaginator } from '@angular/material/paginator';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FormControl } from '@angular/forms';
import { CategoriesService } from '../../../core/services/categories.service';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss'],
})
export class TutorialsComponent implements OnInit, AfterViewInit, OnDestroy {
  //after view init zeby pobrac z szablonu html mat paginator
  simpleTutorials: SimpleTutorial[] = [];
  totalCount = 0;
  sub$ = new Subscription();
  searchControl = new FormControl<string>('');
  sortControl = new FormControl<string>('');
  orderControl = new FormControl<string>('');
  categoryControl = new FormControl<string>('');
  filteredOptions!: Observable<SimpleTutorial[]>;

  categories: Category[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tutorialService: TutorialsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => {
        //return this.tutorialService.getTutorials(1, 10, value);
        if (value!.trim() !== '') {
          return this.tutorialService.getTutorials(1, 10, value);
        } else {
          return of({ tutorials: [] });
        }
      }),
      map(({ tutorials }) => {
        return [...tutorials];
      }),
    );

    console.log('siema');

    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        console.log(categories);
        this.categories = [...categories];
      },
      error: (err) => {
        console.log('blad kategoryjny');
        console.log(err);
      },
    });
  }

  ngAfterViewInit(): void {
    this.tutorialService.getTutorials().subscribe({
      next: ({ tutorials, totalCount }) => {
        //console.log(tutorials);
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

          const tutorialName = queryMap.get('name')
            ? queryMap.get('name')
            : null;

          const sortElement = queryMap.get('sort_of')
            ? queryMap.get('sort_of')
            : null;

          const order = queryMap.get('sort') ? queryMap.get('sort') : null;

          const category = queryMap.get('category')
            ? queryMap.get('category')
            : null;

          //todo mniej wiecej tutaj dodac spinner do ladowania produktow, tutaj zaczyna sie pobieranie
          return this.tutorialService.getTutorials(
            page,
            itemsPerPage,
            tutorialName,
            sortElement,
            order,
            category,
          );
        }),
        map(({ tutorials, totalCount }) => {
          this.totalCount = totalCount;
          this.simpleTutorials = tutorials;
          //todo tutaj gdzies sie konczy pobieranie
        }),
      )
      .subscribe({
        error: (err) => {
          //todo te błędy err pobierają się poprawnie dzięki error handling interceptor
          this.notifierService.notify('error', err);
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
            this.searchParamsNavigate();
          },
        }),
    );
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  searchTutorials() {
    this.paginator.pageIndex = 0;
    //todo to jest prawdopodobnie niepotrzebne
    //this.paginator.pageSize = 5;

    this.searchParamsNavigate();
  }

  searchParamsNavigate() {
    const queryParams: { [key: string]: string | number } = {
      page: this.paginator.pageIndex + 1,
      itemsPerPage: this.paginator.pageSize,
    };

    if (this.searchControl.value) {
      //todo tylko tutaj nie powinno byc encodowania, do poprawy w przyszlosci
      queryParams['name'] = this.searchControl.value;
    }

    if (this.sortControl.value) {
      queryParams['sort_of'] = this.sortControl.value;
    }

    if (this.orderControl.value) {
      queryParams['sort'] = this.orderControl.value;
    }

    if (this.categoryControl.value) {
      queryParams['category'] = this.categoryControl.value;
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
  }
}
