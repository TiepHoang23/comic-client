import { Component, Input } from '@angular/core';
import { Comic } from '../../../../../dataSource/schema/comic';

@Component({
  selector: 'app-carousel-layout',
  templateUrl: './carousel-layout.component.html',
  styleUrl: './carousel-layout.component.scss',
})
export class CarouselLayoutComponent {
  images: string[] = [];
  @Input() comics?: Comic[] = [];
  constructor() { }

  ngOnInit(): void {
    this.preloadImages();
  }

  preloadImages(): void {
    this.comics?.forEach((comic, index) => {
    });
  }
}
