import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserIngredient } from '../../../../core/models/tutorial/tutorial.models';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { userIngredient: UserIngredient },
  ) {
    this.ingredient = data.userIngredient;
  }

  ingredient: UserIngredient | null = null;
}
