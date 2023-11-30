import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormService } from '../../../../core/services/form.service';
import { UserIngredientService } from '../../../../core/services/user-ingredient.service';
import { NotifierService } from 'angular-notifier';
import { FormControl, FormGroup } from '@angular/forms';
import { AddUserIngredientForm } from '../../../../core/models/forms/user.forms.models';
import { Ingredient } from '../../../../core/models/tutorial/tutorial.models';
import { IngredientService } from '../../../../core/services/ingredient.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
  addUserIngredientForm: FormGroup<AddUserIngredientForm> =
    this.formService.initAddUserIngredientForm();

  // ingredientControl = new FormControl<string>('');

  ingredients: Ingredient[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private formService: FormService,
    private ingredientService: IngredientService,
    private userIngredientService: UserIngredientService,
    private notifierService: NotifierService,
  ) {}

  get controls() {
    return this.addUserIngredientForm.controls;
  }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe({
      next: (ingredients) => {
        this.ingredients = [...ingredients];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onAddUserIngredient() {
    const ingredientShortId =
      this.addUserIngredientForm.controls.ingredientShortId.value;
    const quantity = Number(this.addUserIngredientForm.controls.quantity.value);
    const expirationDate =
      this.addUserIngredientForm.controls.expirationDate.value;

    return this.userIngredientService
      .addUserIngredient(ingredientShortId, quantity, expirationDate)
      .subscribe({
        next: () => {
          this.notifierService.notify('success', 'Pomyślnie dodano składnik');
          this.dialogRef.close();
        },
        error: (err) => {
          this.notifierService.notify('error', err);
          this.dialogRef.close();
        },
      });
  }

  getErrorMessage(formControl: FormControl): string {
    return this.formService.getErrorMessage(formControl);
  }
}
