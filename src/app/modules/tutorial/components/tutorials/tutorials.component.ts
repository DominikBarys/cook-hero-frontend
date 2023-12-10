import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TutorialsService } from '../../../core/services/tutorials.service';
import {
  Category,
  Dish,
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
import { DishService } from '../../../core/services/dish.service';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TutorialsComponent implements OnInit, AfterViewInit, OnDestroy {
  simpleTutorials: SimpleTutorial[] = [];
  totalCount = 0;
  sub$ = new Subscription();
  searchControl = new FormControl<string>('');
  sortControl = new FormControl<string>('');
  orderControl = new FormControl<string>('');
  categoryControl = new FormControl<string>('');
  dishControl = new FormControl<string>('');
  filteredOptions!: Observable<SimpleTutorial[]>;

  hasMeat = false;
  isVeganRecipe = false;
  isSweetRecipe = false;
  isSpicyRecipe = false;

  categories: Category[] = [];
  dishes: Dish[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tutorialService: TutorialsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private categoriesService: CategoriesService,
    private dishService: DishService,
  ) {}

  ngOnInit(): void {
    this.hasMeat = false;
    this.isVeganRecipe = false;
    this.isSweetRecipe = false;
    this.isSpicyRecipe = false;

    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => {
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

    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = [...categories];
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.dishService.getDishes().subscribe({
      next: (dishes) => {
        this.dishes = [...dishes];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngAfterViewInit(): void {
    this.tutorialService.getTutorials().subscribe({
      next: ({ tutorials, totalCount }) => {
        this.simpleTutorials = [...tutorials];
        this.totalCount = totalCount;
        console.log(this.simpleTutorials);
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

          const dish = queryMap.get('dish') ? queryMap.get('dish') : null;

          const hasMeat = queryMap.get('hasMeat')
            ? queryMap.get('hasMeat')
            : null;

          const isVeganRecipe = queryMap.get('isVeganRecipe')
            ? queryMap.get('isVeganRecipe')
            : null;

          const isSweetRecipe = queryMap.get('isSweetRecipe')
            ? queryMap.get('isSweetRecipe')
            : null;

          const isSpicyRecipe = queryMap.get('isSpicyRecipe')
            ? queryMap.get('isSpicyRecipe')
            : null;

          return this.tutorialService.getTutorials(
            page,
            itemsPerPage,
            tutorialName,
            sortElement,
            order,
            category,
            dish,
            hasMeat,
            isVeganRecipe,
            isSweetRecipe,
            isSpicyRecipe,
          );
        }),
        map(({ tutorials, totalCount }) => {
          this.totalCount = totalCount;
          this.simpleTutorials = tutorials;
        }),
      )
      .subscribe({
        error: (err) => {
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
    this.searchParamsNavigate();
  }

  searchParamsNavigate() {
    const queryParams: { [key: string]: string | number } = {
      page: this.paginator.pageIndex + 1,
      itemsPerPage: this.paginator.pageSize,
    };

    if (this.searchControl.value) {
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

    if (this.dishControl.value) {
      queryParams['dish'] = this.dishControl.value;
    }

    if (this.hasMeat) {
      queryParams['hasMeat'] = this.hasMeat.toString();
    }

    if (this.isVeganRecipe) {
      queryParams['isVeganRecipe'] = this.isVeganRecipe.toString();
    }

    if (this.isSweetRecipe) {
      queryParams['isSweetRecipe'] = this.isSweetRecipe.toString();
    }

    if (this.isSpicyRecipe) {
      queryParams['isSpicyRecipe'] = this.isSpicyRecipe.toString();
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
    console.log(this.simpleTutorials);
  }

  assistantSearch() {
    return this.tutorialService.getAssistantTutorials().subscribe({
      next: (resp) => {
        this.totalCount = resp.totalCount;
        this.simpleTutorials = resp.tutorials;
        this.notifierService.notify(
          'success',
          'Poradniki na podstawie twoich produktów w lodówce',
        );
      },
      error: (err) => {
        this.notifierService.notify('error', err);
      },
    });
  }
}
