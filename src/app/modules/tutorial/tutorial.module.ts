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
import { NotificationComponent } from './components/notification/notification.component';
import { FridgeComponent } from './components/fridge/fridge.component';
import { MatIconModule } from '@angular/material/icon';
import { EditDialogComponent } from './components/fridge/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './components/fridge/add-dialog/add-dialog.component';

@NgModule({
  declarations: [
    TutorialsComponent,
    TutorialCardComponent,
    TutorialDetailsComponent,
    ImageCarouselComponent,
    CreatorComponent,
    UploadedImagesComponent,
    NotificationComponent,
    FridgeComponent,
    EditDialogComponent,
    AddDialogComponent,
  ],
  imports: [
    SharedModule,
    TutorialRoutingModule,
    AngularEditorModule,
    MatIconModule,
  ],
})
export class TutorialModule {}
