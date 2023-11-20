import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { TutorialDetailsComponent } from './components/tutorials/tutorial-details/tutorial-details.component';
import { CreatorComponent } from './components/creator/creator.component';

const routes: Routes = [
  { path: 'kreator', component: CreatorComponent },
  { path: '', component: TutorialsComponent },
  { path: ':shortId', component: TutorialDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialRoutingModule {}
