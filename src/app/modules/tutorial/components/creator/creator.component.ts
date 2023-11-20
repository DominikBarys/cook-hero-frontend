import { Component } from '@angular/core';
import { ImageService } from '../../../core/services/image.service';
import { Image } from '../../../core/models/tutorial/tutorial.models';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss'],
})
export class CreatorComponent {
  selectedFile: File | null = null;
  fileName = '';
  imageUrls: Image[] = [];

  constructor(
    private imageService: ImageService,
    private notifierService: NotifierService,
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('multipartFile', this.selectedFile);
      this.imageService.addImage(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.imageUrls = [...this.imageUrls, { ...response }];
        },
        error: (err) => {
          console.log(err);
          this.notifierService.notify('error', err);
        },
      });
    }
  }

  setActiveImagesUrls(imageArray: Image[]) {
    this.imageUrls = [...imageArray];
  }
}
