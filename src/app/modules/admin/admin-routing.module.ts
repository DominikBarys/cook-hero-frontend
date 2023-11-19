import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { CategoryFormComponent } from './components/administrator/category-form/category-form.component';
import { DishFormComponent } from './components/administrator/dish-form/dish-form.component';

const routes: Routes = [
  {
    path: 'zarzadzaj',
    component: AdministratorComponent,
    children: [
      { path: 'kategorie', component: CategoryFormComponent },
      { path: 'dania', component: DishFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
