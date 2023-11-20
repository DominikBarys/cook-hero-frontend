import { Component } from '@angular/core';
import { ImageService } from '../../../core/services/image.service';
import {
  AddTutorialData,
  Category,
  Image,
} from '../../../core/models/tutorial/tutorial.models';
import { NotifierService } from 'angular-notifier';
import { PostTutorial } from '../../../core/models/forms/user.forms.models';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../core/services/form.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CategoriesService } from '../../../core/services/categories.service';
import { TutorialsService } from '../../../core/services/tutorials.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss'],
})
export class CreatorComponent {
  config: AngularEditorConfig = this.imageService.config;

  selectedFile: File | null = null;
  fileName = '';
  imageUrls: Image[] = [];
  addTutorialForm: FormGroup<PostTutorial> =
    this.formService.initAddTutorialForm();
  categories: Observable<Category[]> = this.categoriesService.getCategories();
  //todo to nie dzialalo
  //categories: BehaviorSubject<Category[]> = this.categoriesService.categories;

  constructor(
    private imageService: ImageService,
    private notifierService: NotifierService,
    private formService: FormService,
    private categoriesService: CategoriesService,
    private tutorialService: TutorialsService,
  ) {}

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
    const formValue = this.addTutorialForm.getRawValue();
    const parametersObject: { [key: string]: string } = {};

    formValue.parameters.forEach((item) => {
      parametersObject[item.key] = item.value;
    });

    const parameters = `${JSON.stringify(parametersObject)}`;

    const imagesUuid = this.imageUrls.map((url) => {
      const [uuid] = url.url.split('shortId=');
      return uuid;
    });

    const addTutorialData: AddTutorialData = {
      ...formValue,
      parameters,
      imagesUuid,
    };

    console.log(addTutorialData);

    this.tutorialService.addTutorial(addTutorialData).subscribe({
      next: () => {
        this.addTutorialForm.reset();
        this.imageUrls = [];
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
}
