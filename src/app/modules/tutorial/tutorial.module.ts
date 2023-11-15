import { NgModule } from '@angular/core';

import { TutorialRoutingModule } from './tutorial-routing.module';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { SharedModule } from '../shared/shared.module';
import { TutorialComponent } from './components/tutorials/tutorial/tutorial.component';

@NgModule({
  declarations: [TutorialsComponent, TutorialComponent],
  imports: [SharedModule, TutorialRoutingModule],
})
export class TutorialModule {}
