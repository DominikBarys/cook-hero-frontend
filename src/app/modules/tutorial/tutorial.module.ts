import { NgModule } from '@angular/core';

import { TutorialRoutingModule } from './tutorial-routing.module';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { SharedModule } from '../shared/shared.module';
import { TutorialCardComponent } from './components/tutorials/tutorial-card/tutorial-card.component';
import { TutorialDetailsComponent } from './components/tutorials/tutorial-details/tutorial-details.component';
import { ImageCarouselComponent } from './components/tutorials/tutorial-details/image-carousel/image-carousel.component';
import { CreatorComponent } from './components/creator/creator.component';
import { UploadedImagesComponent } from './components/creator/uploaded-images/uploaded-images.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    TutorialsComponent,
    TutorialCardComponent,
    TutorialDetailsComponent,
    ImageCarouselComponent,
    CreatorComponent,
    UploadedImagesComponent,
  ],
  imports: [SharedModule, TutorialRoutingModule, AngularEditorModule],
})
export class TutorialModule {}
