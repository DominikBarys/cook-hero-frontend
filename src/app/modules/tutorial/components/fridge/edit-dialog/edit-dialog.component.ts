import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserIngredient } from '../../../../core/models/tutorial/tutorial.models';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangeUserIngredientForm } from '../../../../core/models/forms/user.forms.models';
import { FormService } from '../../../../core/services/form.service';
import { UserIngredientService } from '../../../../core/services/user-ingredient.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  ingredient: UserIngredient | null = null;
  changeUserIngredientForm: FormGroup<ChangeUserIngredientForm> =
    this.formService.initChangeUserIngredientForm();

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public data: { userIngredient: UserIngredient },
    private userIngredientService: UserIngredientService,
    private notifierService: NotifierService,
  ) {
    this.ingredient = data.userIngredient;
  }

  get controls() {
    return this.changeUserIngredientForm.controls;
  }

  onChangeUserIngredient() {
    const shortId = this.data.userIngredient.shortId;
    const quantity = Number(
      this.changeUserIngredientForm.controls.quantity.value,
    );
    const expirationDate =
      this.changeUserIngredientForm.controls.expirationDate.value;

    return this.userIngredientService
      .changeUserIngredient({
        shortId,
        quantity,
        expirationDate,
      })
      .subscribe({
        next: () => {
          this.notifierService.notify(
            'success',
            'Pomyślnie zedytowano składnik',
          );
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
