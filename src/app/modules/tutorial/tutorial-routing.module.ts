import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { TutorialDetailsComponent } from './components/tutorials/tutorial-details/tutorial-details.component';
import { CreatorComponent } from './components/creator/creator.component';
import { FridgeComponent } from './components/fridge/fridge.component';
import { NotificationComponent } from './components/notification/notification.component';

const routes: Routes = [
  { path: 'lodowka', component: FridgeComponent },
  {
    path: 'powiadomienia',
    component: NotificationComponent,
  },
  { path: 'kreator', component: CreatorComponent },
  { path: '', component: TutorialsComponent },
  { path: ':shortId', component: TutorialDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialRoutingModule {}
