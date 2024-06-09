import { Component, Inject, Input, OnInit } from '@angular/core';
import { Comic } from '../../../dataSource/schema/comic';
import chunk from 'lodash/chunk';
import { DOCUMENT } from '@angular/common';
import { forEach } from 'lodash';
import { ComicService } from '@services/comic.service';

@Component({
  selector: 'app-carousel-landing',
  templateUrl: './carousel-landing.component.html',
  styleUrls: ['./carousel-landing.component.scss'], // Change styleUrl to styleUrls
})
export class CarouselLandingComponent implements OnInit {
  carouselItems: Array<Comic[]> = [];

  slideElements: Element[] = [];
  lastTime: number = 0;

  isTransitioning: boolean = false;
  private interval: any;
  constructor(
    private comicService: ComicService) { }
  ngOnInit(): void {
    this.comicService.getrecommendComics().subscribe((res: any) => {
      let dataSlide = res.data;
      this.carouselItems = chunk(dataSlide, 5);
    })
  }
  ngOnChanges(change: any) {
    this.resetAutoSlide();
  }


  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
    if (this.slideElements.length === 0) {
      this.slideElements = Array.from(
        document.getElementsByClassName('carousel-item')
      );
      if (this.slideElements.length > 0) {
        this.recalpulate();
      }
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  private startAutoSlide() {
    this.interval = setInterval(() => {
      this.recalpulate();
    }, 4000);
  }

  recalpulate(isNext = true): void {
    let now = Date.now();
    if (now - this.lastTime < 700) {
      return;
    }
    this.lastTime = now;

    if (isNext) {
      let last = this.slideElements.pop()!;
      this.slideElements = [last, ...this.slideElements];
    } else {
      let first = this.slideElements.shift()!;
      this.slideElements = [...this.slideElements, first];
    }

    this.slideElements.forEach((e: any, index) => {
      e.style.left = `${((index - 1) * 100) / 3}%`;
      if (index == 0) {
        e.style['z-index'] = 0;
      } else e.style['z-index'] = 5 - index;
    });
  }

  private resetAutoSlide() {
    clearInterval(this.interval); // Clear the existing interval
    this.startAutoSlide(); // Restart the automatic sliding
  }
}
