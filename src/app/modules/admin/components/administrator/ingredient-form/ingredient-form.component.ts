import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddIngredientForm } from '../../../../core/models/forms/user.forms.models';
import { Ingredient } from '../../../../core/models/tutorial/tutorial.models';
import { FormService } from '../../../../core/services/form.service';
import { NotifierService } from 'angular-notifier';
import { IngredientService } from '../../../../core/services/ingredient.service';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.scss'],
})
export class IngredientFormComponent implements OnInit {
  addIngredientForm: FormGroup<AddIngredientForm> =
    this.formService.initAddIngredientForm();
  ingredientControl = new FormControl<string>('');
  ingredients: Ingredient[] = [];

  constructor(
    private formService: FormService,
    private ingredientService: IngredientService,
    private notifierService: NotifierService,
  ) {}

  onAddIngredient() {
    this.ingredientService
      .addIngredient(this.addIngredientForm.getRawValue())
      .subscribe({
        next: () => {
          this.ingredientService.getIngredients().subscribe({
            next: (ingredients) => {
              this.ingredients = [...ingredients];
            },
            error: (err) => {
              console.log(err);
            },
          });
          this.notifierService.notify('success', 'Składnik został dodany');
          this.addIngredientForm.reset();
        },
        error: (err) => {
          this.notifierService.notify('error', err);
        },
      });
  }

  onDeleteIngredient() {
    const shortId = this.ingredientControl.getRawValue()!;
    this.ingredientService.deleteIngredient(shortId).subscribe({
      next: () => {
        this.ingredientService.getIngredients().subscribe({
          next: (dishes) => {
            this.ingredients = [...dishes];
          },
          error: (err) => {
            this.notifierService.notify('error', err);
          },
        });
        this.notifierService.notify('success', 'Danie zostało usunięte');
      },
      error: (err) => {
        this.notifierService.notify('error', err);
      },
    });
  }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe({
      next: (dishes) => {
        this.ingredients = [...dishes];
      },
      error: (err) => {
        this.notifierService.notify('error', err);
      },
    });
  }
}
