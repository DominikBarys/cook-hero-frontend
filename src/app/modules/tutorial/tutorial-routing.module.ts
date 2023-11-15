import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialsComponent } from './components/tutorials/tutorials.component';

const routes: Routes = [{ path: '', component: TutorialsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialRoutingModule {}
