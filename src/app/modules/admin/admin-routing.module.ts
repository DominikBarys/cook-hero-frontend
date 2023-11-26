import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { CategoryFormComponent } from './components/administrator/category-form/category-form.component';
import { DishFormComponent } from './components/administrator/dish-form/dish-form.component';
import { IsAdminGuard } from '../core/guards/is-admin.guard';
import { IngredientFormComponent } from './components/administrator/ingredient-form/ingredient-form.component';
import { UserFormComponent } from './components/administrator/user-form/user-form.component';

const routes: Routes = [
  {
    path: 'zarzadzaj',
    component: AdministratorComponent,
    canActivate: [IsAdminGuard],
    children: [
      { path: 'kategorie', component: CategoryFormComponent },
      { path: 'dania', component: DishFormComponent },
      { path: 'skladniki', component: IngredientFormComponent },
      { path: 'uzytkownicy', component: UserFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
