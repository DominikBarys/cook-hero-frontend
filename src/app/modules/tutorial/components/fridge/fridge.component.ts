import { Component, OnInit } from '@angular/core';
import { UserIngredientService } from '../../../core/services/user-ingredient.service';
import { UserIngredient } from '../../../core/models/tutorial/tutorial.models';
import { NotifierService } from 'angular-notifier';
import { switchMap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss'],
})
export class FridgeComponent implements OnInit {
  constructor(
    private userIngredientService: UserIngredientService,
    private notifierService: NotifierService,
    public dialog: MatDialog,
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

  onEditIngredient(userIngredient: UserIngredient) {
    this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: { userIngredient },
    });
  }

  onAddIngredient() {
    this.dialog.open(EditDialogComponent, {
      width: '250px',
    });
  }
}
