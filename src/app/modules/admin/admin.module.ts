import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { CategoryFormComponent } from './components/administrator/category-form/category-form.component';
import { DishFormComponent } from './components/administrator/dish-form/dish-form.component';


@NgModule({
  declarations: [
    AdministratorComponent,
    CategoryFormComponent,
    DishFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
