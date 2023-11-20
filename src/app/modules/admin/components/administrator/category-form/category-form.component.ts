import { Component } from '@angular/core';
import { FormService } from '../../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AddCategoryForm } from '../../../../core/models/forms/user.forms.models';
import { CategoriesService } from '../../../../core/services/categories.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  addCategoryForm: FormGroup<AddCategoryForm> =
    this.formService.initAddCategoryForm();

  constructor(
    private formService: FormService,
    private categoriesService: CategoriesService,
    private notifierService: NotifierService,
  ) {}

  onAddCategory() {
    this.categoriesService
      .addCategory(this.addCategoryForm.getRawValue())
      .subscribe({
        next: () => {
          this.notifierService.notify('success', 'Kategoria została dodana');
        },
        error: (err) => {
          this.notifierService.notify('error', err);
        },
      });
  }
}
