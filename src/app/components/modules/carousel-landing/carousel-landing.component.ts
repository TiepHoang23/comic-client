import { Component, Inject, Input, OnInit } from '@angular/core';
import { Comic } from '../../../dataSource/schema/comic';
import chunk from 'lodash/chunk';
import { DOCUMENT } from '@angular/common';
import { forEach } from 'lodash';

@Component({
  selector: 'app-carousel-landing',
  templateUrl: './carousel-landing.component.html',
  styleUrls: ['./carousel-landing.component.scss'], // Change styleUrl to styleUrls
})
export class CarouselLandingComponent implements OnInit {


  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }
  @Input() dataSlide?: Comic[] = [];
  carouselItems: Array<Comic[]> = [];

  selectedIndex = 0;
  lastTime: number = 0;

  isTransitioning: boolean = false;
  private interval: any;
  current: number = 0;

  ngOnChanges() {

    const comicChunk = chunk(this.dataSlide, 5); // get 5 comics per slide
    this.carouselItems = comicChunk;
    this.carouselItems.push(...comicChunk);

    this.resetAutoSlide();
  }

  ngOnInit(): void {

  }
  slideElements: Element[] = [];
  ngAfterViewInit() {
    this.slideElements = Array.from(this.document.getElementsByClassName('carousel-item'));
    this.recalputate();

  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  private startAutoSlide() {
    this.interval = setInterval(() => {
      this.recalputate();
    }, 4000);
  }


  recalputate(isNext = true) {

    let now = Date.now();
    if (now - this.lastTime < 700) {
      return;
    }
    this.lastTime = now;
    if (isNext) {
      let last = this.slideElements.pop()!;
      this.slideElements = [last, ...this.slideElements];

    }
    else {
      let first = this.slideElements.shift()!;
      this.slideElements = [...this.slideElements, first];
    }


    this.slideElements.forEach((e: any, index) => {
      e.style.left = `${(index - 1) * 100 / 3}%`;
      if (index == 0) {
        e.style["z-index"] = 0
      }
      else
        e.style["z-index"] = 5 - index

    })

  }

  private resetAutoSlide() {
    clearInterval(this.interval); // Clear the existing interval
    this.startAutoSlide(); // Restart the automatic sliding
  }
}
