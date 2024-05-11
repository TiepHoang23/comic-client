import { Component, Input, OnInit } from '@angular/core';
import { Comic } from '../../../dataSource/schema/comic';
import chunk from 'lodash/chunk';

@Component({
  selector: 'app-carousel-landing',
  templateUrl: './carousel-landing.component.html',
  styleUrls: ['./carousel-landing.component.scss'], // Change styleUrl to styleUrls
})
export class CarouselLandingComponent implements OnInit {
  @Input() dataSlide?: Comic[] = [];
  carouselItems: Array<{
    slideIndex: number;
    comic?: Comic[];
  }> = [
      {
        slideIndex: 1,
      },
      {
        slideIndex: 2,
      },
      {
        slideIndex: 3,
      }
    ];

  selectedIndex = 0;
  isTransitioning: boolean = false;
  private interval: any;

  ngOnChanges() {
    this.carouselItems = this.carouselItems?.map((slide, index) => {
      const comicChunk = chunk(this.dataSlide, 5); // get 5 comics per slide
      return {
        slideIndex: slide.slideIndex,
        comic: comicChunk[index],
      };
    });
    // this.startAutoSlide();
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  private startAutoSlide() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  selectSlide(index: number) {
    this.selectedIndex = index;
  }

  prevSlide() {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.carouselItems.length) %
      this.carouselItems.length;
    this.rotateCarouselItems();
  }

  nextSlide() {
    this.selectedIndex = (this.selectedIndex + 1) % this.carouselItems.length;
    this.rotateCarouselItems();
  }

  private rotateCarouselItems() {
    const firstItem = this.carouselItems[0];
    this.carouselItems.splice(0, 1);
    this.carouselItems.push(firstItem);
  }

  // private resetAutoSlide() {
  //   clearInterval(this.interval); // Clear the existing interval
  //   this.startAutoSlide(); // Restart the automatic sliding
  // }
}
