import { NgModule } from '@angular/core';

import { TutorialRoutingModule } from './tutorial-routing.module';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { SharedModule } from '../shared/shared.module';
import { TutorialCardComponent } from './components/tutorials/tutorial/tutorial-card.component';

@NgModule({
  declarations: [TutorialsComponent, TutorialCardComponent],
  imports: [SharedModule, TutorialRoutingModule],
})
export class TutorialModule {}
