import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserIngredientService } from '../../../core/services/user-ingredient.service';
import { UserIngredient } from '../../../core/models/tutorial/tutorial.models';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject, switchMap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

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
  //userIngredients: UserIngredient[] = [];
  userIngredients$ = new BehaviorSubject<UserIngredient[]>([]);
  userIngredients: UserIngredient[] | null = null;

  ngOnInit(): void {
    this.userIngredientService.getUserIngredients().subscribe({
      next: (userIngredients) => {
        this.userIngredients = [...userIngredients];
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.userIngredients$.subscribe({
      next: (resp) => {
        this.userIngredients = [...resp];
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
    //console.log(this.userIngredients);
  }

  onEditIngredient(userIngredient: UserIngredient) {
    this.dialog.open(EditDialogComponent, {
      width: '600px',
      height: '350px',
      data: { userIngredient },
    });
  }

  onAddIngredient() {
    this.dialog.open(AddDialogComponent, {
      width: '600px',
      height: '350px',
    });
  }
}
