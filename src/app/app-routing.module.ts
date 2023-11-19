import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'poradniki',
    loadChildren: () =>
      import('./modules/tutorial/tutorial.module').then(
        (m) => m.TutorialModule,
      ),
  },
  {
    path: 'administracja',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
