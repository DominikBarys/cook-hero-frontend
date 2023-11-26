import { Component, OnInit } from '@angular/core';
import { UserIngredientService } from '../../../core/services/user-ingredient.service';
import { UserIngredient } from '../../../core/models/tutorial/tutorial.models';
import { NotifierService } from 'angular-notifier';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss'],
})
export class FridgeComponent implements OnInit {
  constructor(
    private userIngredientService: UserIngredientService,
    private notifierService: NotifierService,
  ) {}
  userIngredients: UserIngredient[] = [];

  ngOnInit(): void {
    this.userIngredientService.getUserIngredients().subscribe({
      next: (userIngredients) => {
        this.userIngredients = [...userIngredients];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDeleteUserIngredient(userIngredient: UserIngredient) {
    this.userIngredientService
      .deleteUserIngredient(userIngredient.shortId)
      .pipe(switchMap(() => this.userIngredientService.getUserIngredients()))
      .subscribe({
        next: (userIngredients) => {
          this.userIngredients = [...userIngredients];
          this.notifierService.notify('success', 'Składnik usunięto pomyślnie');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  test() {
    console.log(this.userIngredients);
  }
}
