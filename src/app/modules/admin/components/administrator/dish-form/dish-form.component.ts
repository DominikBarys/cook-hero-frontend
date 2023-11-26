import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddDishForm } from '../../../../core/models/forms/user.forms.models';
import { Dish } from '../../../../core/models/tutorial/tutorial.models';
import { FormService } from '../../../../core/services/form.service';
import { NotifierService } from 'angular-notifier';
import { DishService } from '../../../../core/services/dish.service';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.scss'],
})
export class DishFormComponent implements OnInit {
  addDishForm: FormGroup<AddDishForm> = this.formService.initAddDishForm();

  dishControl = new FormControl<string>('');

  dishes: Dish[] = [];

  constructor(
    private formService: FormService,
    private dishService: DishService,
    private notifierService: NotifierService,
  ) {}

  onAddDish() {
    this.dishService.addDish(this.addDishForm.getRawValue()).subscribe({
      next: () => {
        this.dishService.getDishes().subscribe({
          next: (dishes) => {
            this.dishes = [...dishes];
          },
          error: (err) => {
            console.log(err);
          },
        });
        this.notifierService.notify('success', 'Danie zostało dodane');
      },
      error: (err) => {
        this.notifierService.notify('error', err);
      },
    });
  }

  onDeleteDish() {
    const shortId = this.dishControl.getRawValue()!;
    this.dishService.deleteDish(shortId).subscribe({
      next: () => {
        this.dishService.getDishes().subscribe({
          next: (dishes) => {
            this.dishes = [...dishes];
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
    this.dishService.getDishes().subscribe({
      next: (dishes) => {
        this.dishes = [...dishes];
      },
      error: (err) => {
        this.notifierService.notify('error', err);
      },
    });
  }
}
