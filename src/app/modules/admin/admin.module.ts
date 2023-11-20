import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { CategoryFormComponent } from './components/administrator/category-form/category-form.component';
import { DishFormComponent } from './components/administrator/dish-form/dish-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IngredientFormComponent } from './components/administrator/ingredient-form/ingredient-form.component';

@NgModule({
  declarations: [
    AdministratorComponent,
    CategoryFormComponent,
    DishFormComponent,
    IngredientFormComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
