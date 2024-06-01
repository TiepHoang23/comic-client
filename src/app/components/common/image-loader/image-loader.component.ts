import { Component, Input, OnDestroy } from '@angular/core';

import { Subscription, delay, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ImageService } from '@services/image.service';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
})
export class ImageLoaderComponent implements OnDestroy {
  @Input()
  imageUrl!: string;
  imageSrc: string = '';
  constructor(private imageService: ImageService) {}

  
  ngOnInit() {
    this.loadImage();
  }

  loadImage(): void {
    if (!this.imageUrl) return;
    this.imageService.loadImage(this.imageUrl, this.OnLoaded);
  }

  OnLoaded =(res :HttpResponse<Blob>) :void =>{
    
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
    reader.readAsDataURL(res.body as Blob);
  }

  ngOnDestroy() {
    this.imageService.CancelLoad(this.imageUrl);
  }
}
