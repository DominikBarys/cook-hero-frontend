import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { TutorialDetailsComponent } from './components/tutorials/tutorial-details/tutorial-details.component';

const routes: Routes = [
  { path: '', component: TutorialsComponent },
  { path: ':shortId', component: TutorialDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialRoutingModule {}
