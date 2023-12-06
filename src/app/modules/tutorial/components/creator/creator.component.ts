import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../core/services/image.service';
import {
  AddPageData,
  AddTutorialData,
  Category,
  Dish,
  Image,
  Ingredient,
  Page,
} from '../../../core/models/tutorial/tutorial.models';
import { NotifierService } from 'angular-notifier';
import { PostTutorial } from '../../../core/models/forms/user.forms.models';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../core/services/form.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CategoriesService } from '../../../core/services/categories.service';
import { TutorialsService } from '../../../core/services/tutorials.service';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { DishService } from '../../../core/services/dish.service';
import { IngredientService } from '../../../core/services/ingredient.service';
import { PageService } from '../../../core/services/page.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss'],
})
export class CreatorComponent implements OnInit {
  config: AngularEditorConfig = this.imageService.config;

  selectedFile: File | null = null;
  fileName = '';
  imageUrls: Image[] = [];
  addTutorialForm: FormGroup<PostTutorial> =
    this.formService.initAddTutorialForm();
  categories: Observable<Category[]> = this.categoriesService.getCategories();
  dishes: Observable<Dish[]> = this.dishService.getDishes();
  ingredients: Observable<Ingredient[]> =
    this.ingredientService.getIngredients();

  selectedIngredient: Ingredient | null = null;
  mainIngredients: Ingredient[] = [];

  hasMeat = false;
  isVeganRecipe = false;
  isSweetRecipe = false;
  isSpicyRecipe = false;

  pages: AddPageData[] = [];
  pageContentHtml: string | null = null;
  pageCount = 1;
  //todo to nie dzialalo
  //categories: BehaviorSubject<Category[]> = this.categoriesService.categories;

  constructor(
    private imageService: ImageService,
    private notifierService: NotifierService,
    private formService: FormService,
    private categoriesService: CategoriesService,
    private tutorialService: TutorialsService,
    private dishService: DishService,
    private ingredientService: IngredientService,
    private pageService: PageService,
  ) {}

  ngOnInit(): void {
    this.resetCreator();
  }

  get controls() {
    return this.addTutorialForm.controls;
  }

  get parameters(): FormArray<
    FormGroup<{ value: FormControl<string>; key: FormControl<string> }>
  > {
    return this.addTutorialForm.controls.parameters;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('multipartFile', this.selectedFile);
      this.imageService.addImage(formData).subscribe({
        next: (response) => {
          this.imageUrls = [...this.imageUrls, { ...response }];
        },
        error: (err) => {
          this.notifierService.notify('error', err);
        },
      });
    }
  }

  setActiveImagesUrls(imageArray: Image[]) {
    this.imageUrls = [...imageArray];
  }

  getErrorMessage(control: FormControl<string>) {
    return this.formService.getErrorMessage(control);
  }

  onAddTutorial() {
    console.log('WBIJAM DO ON ADD TUTORIAL');
    const formValue = this.addTutorialForm.getRawValue();
    const parametersObject: { [key: string]: string } = {};

    const name = formValue.name;
    const timeToPrepare = Number(formValue.timeToPrepare);
    const difficulty = Number(formValue.difficulty);
    const shortDescription = formValue.shortDescription;
    const dishShortId = formValue.dishShortId;
    const categoryShortId = formValue.categoryShortId;
    const mainIngredientsShortIds = this.mainIngredients.map(
      (ingredient) => ingredient.shortId,
    );

    formValue.parameters.forEach((item) => {
      parametersObject[item.key] = item.value;
    });

    const parameters = `${JSON.stringify(parametersObject)}`;

    const imagesUuid = this.imageUrls.map((url) => {
      // console.log('DODAWANE ZDJECIE URL');
      // console.log(url);
      // const [uuid] = url.url.split('shortId=');
      // return uuid;
      const parsedUrl = new URL(url.url);
      const shortId = parsedUrl.searchParams.get('shortId')!;

      console.log('DODAWANE ZDJECIE URL');
      console.log(url);
      console.log('shortId:', shortId);

      return shortId;
    });

    const addTutorialData: AddTutorialData = {
      name,
      timeToPrepare,
      difficulty,
      shortDescription,
      dishShortId,
      categoryShortId,
      hasMeat: this.hasMeat,
      sweetRecipe: this.isSweetRecipe,
      spicyRecipe: this.isSpicyRecipe,
      veganRecipe: this.isVeganRecipe,
      parameters,
      imagesUuid,
      mainIngredientsShortIds,
    };

    let postPages: Page[] = [];

    this.tutorialService
      .addTutorial(addTutorialData)
      .pipe(
        switchMap((resp) => {
          postPages = this.pages.map((page, index) => ({
            ...page,
            tutorialShortId: resp.tutorialShortId,
            pageNumber: index + 1,
          }));

          const addPageRequests = postPages.map((page) =>
            this.pageService.addPage(page),
          );

          return forkJoin(addPageRequests);
        }),
      )
      .subscribe({
        next: () => {
          this.resetCreator();
          this.notifierService.notify(
            'success',
            'Poradnik został utworzony pomyślnie',
          );
        },
        error: (err) => {
          this.notifierService.notify('error', err);
        },
      });
  }

  deleteParameter(i: number) {
    this.parameters.removeAt(i);
  }

  addParameter() {
    const newFormGroup = new FormGroup({
      key: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      value: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });

    this.parameters.push(newFormGroup);
  }

  addIngredient() {
    if (
      this.selectedIngredient &&
      !this.mainIngredients.includes(this.selectedIngredient)
    ) {
      this.mainIngredients.push(this.selectedIngredient);
      //  console.log(this.mainIngredients);
    } else {
      this.notifierService.notify(
        'warning',
        'Ten składnik już istnieje na liście.',
      );
    }
  }

  onDeleteMainIngredient(mainIngredient: Ingredient) {
    const index = this.mainIngredients.indexOf(mainIngredient);

    if (index !== -1) {
      this.mainIngredients.splice(index, 1);
    }
  }

  onAddPage() {
    const page: AddPageData = {
      pageNumber: this.pageCount,
      htmlContent: this.pageContentHtml!,
    };

    this.pages.push(page);
    this.pageCount++;
    this.pageContentHtml = '';

    // console.log(this.pages);
  }

  onDeletePage(page: AddPageData) {
    const index = this.pages.indexOf(page);

    if (index !== -1) {
      this.pages.splice(index, 1);
      this.pageCount--;
    }
  }

  resetCreator() {
    this.addTutorialForm.reset();
    this.imageUrls = [];
    this.hasMeat = false;
    this.isVeganRecipe = false;
    this.isSpicyRecipe = false;
    this.isSweetRecipe = false;
    this.pageCount = 1;
    this.pages = [];
    this.mainIngredients = [];
  }
}
