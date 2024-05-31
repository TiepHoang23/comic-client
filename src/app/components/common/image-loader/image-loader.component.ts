import { Component, Input, OnDestroy } from '@angular/core';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
})
export class ImageLoaderComponent implements OnDestroy {
  @Input()
  imageUrl!: string;
  imageSrc: string | null = null;

  constructor(private imageService: ImageService) {}
  ngOnInit() {
    this.loadImage();
  }

  loadImage() {
    if (!this.imageUrl) return;
    console.log(this.imageUrl);

    this.imageService.loadImage(this.imageUrl).subscribe(
      (blob: any) => {
        console.log('Image loaded', blob);

        const objectURL = URL.createObjectURL(blob);
        this.imageSrc = objectURL;
      },
      (error) => {
        if (error.name === 'AbortError') {
          console.log('Image loading aborted');
        } else {
          console.error('Error loading image', error);
        }
      },
    );
  }

  ngOnDestroy() {
    this.imageService.abortImageLoad(this.imageUrl);
  }
}
