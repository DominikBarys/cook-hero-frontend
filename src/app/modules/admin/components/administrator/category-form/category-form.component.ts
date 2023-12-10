import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AddCategoryForm } from '../../../../core/models/forms/user.forms.models';
import { CategoriesService } from '../../../../core/services/categories.service';
import { NotifierService } from 'angular-notifier';
import { Category } from '../../../../core/models/tutorial/tutorial.models';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  addCategoryForm: FormGroup<AddCategoryForm> =
    this.formService.initAddCategoryForm();

  categoryControl = new FormControl<string>('');

  categories: Category[] = [];

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
          this.categoriesService.getCategories().subscribe({
            next: (categories) => {
              this.categories = [...categories];
            },
            error: (err) => {
              this.notifierService.notify('error', err);
            },
          });
          this.notifierService.notify('success', 'Kategoria została dodana');
          this.addCategoryForm.reset();
        },
        error: (err) => {
          this.notifierService.notify('error', err);
        },
      });
  }

  onDeleteCategory() {
    const shortId = this.categoryControl.getRawValue()!;
    this.categoriesService.deleteCategory(shortId).subscribe({
      next: () => {
        this.categoriesService.getCategories().subscribe({
          next: (categories) => {
            this.categories = [...categories];
          },
          error: (err) => {
            this.notifierService.notify('error', err);
          },
        });
        this.notifierService.notify('success', 'Kategoria została usunięta');
      },
      error: (err) => {
        this.notifierService.notify('error', err);
      },
    });
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = [...categories];
      },
      error: (err) => {
        this.notifierService.notify('error', err);
      },
    });
  }
}
