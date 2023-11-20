import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from '../../../../core/models/tutorial/tutorial.models';
import { ImageService } from '../../../../core/services/image.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-uploaded-images',
  templateUrl: './uploaded-images.component.html',
  styleUrls: ['./uploaded-images.component.scss'],
})
export class UploadedImagesComponent implements OnInit {
  @Input() imageUrls: Image[] = [];
  @Output() deleteImageUrl = new EventEmitter<Image[]>();

  activeImage = '';

  constructor(
    private imageService: ImageService,
    private notifierService: NotifierService,
  ) {}

  ngOnInit(): void {
    this.activeImage = this.imageUrls[0].url;
  }

  setActiveImage(url: string) {
    this.activeImage = url;
  }

  deleteImage(url: string) {
    const [, shortId] = url.split('shortId=');
    this.imageService.deleteImage(shortId).subscribe({
      next: () => {
        this.imageUrls = this.imageUrls.filter((image) => image.url !== url);
        this.deleteImageUrl.emit([...this.imageUrls]);
        if (this.imageUrls.length > 0) {
          this.activeImage = this.imageUrls[0].url;
        }
      },
      error: (err) => {
        this.notifierService.notify('error', err);
      },
    });
  }
}
