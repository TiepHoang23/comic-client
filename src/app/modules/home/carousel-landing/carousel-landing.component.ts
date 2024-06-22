import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { Comic } from '../../../dataSource/schema/comic';
import chunk from 'lodash/chunk';
import { DOCUMENT } from '@angular/common';
import { forEach } from 'lodash';
import { ComicService } from '@services/comic.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import config from '../../../../../GlobalConfig';
@Component({
  selector: 'app-carousel-landing',
  templateUrl: './carousel-landing.component.html',
  styleUrls: ['./carousel-landing.component.scss'], // Change styleUrl to styleUrls
  animations: [
    // animation triggers
    trigger('slideAnimation', [
      state('in', style({ transform: 'translateY(0)' })),
      state('out', style({ transform: 'translateY(100%)' })),
      transition('in => out', animate('200ms ease-in')),
      transition('out => in', animate('200ms ease-out')),
    ]),
  ],
})
export class CarouselLandingComponent implements OnInit {
  carouselItems: Array<Comic[]> = [];
  slideElements: Element[] = [];
  lastTime: number = 0;
  isTransitioning: boolean = false;
  ComicHover?: Comic;
  interval: any;
  _state = 'out';
  timer: any;
  TypeUI = 0;
  grid = 3;
  constructor(
    private comicService: ComicService) { }
  ngOnInit(): void {
    this.ComputeStyleUI();
    this.comicService.getrecommendComics().subscribe((res: any) => {
      let dataSlide = res.data;
      this.carouselItems = chunk(dataSlide, 5);
    })
    this.resetAutoSlide();

  }

  OnComicLeave() {
    this._state = 'out';
    clearTimeout(this.timer);
    this.startAutoSlide();
  }
  ngOnChanges(change: any) {

  }
  ComputeStyleUI() {
    if (window.innerWidth <= config.GetScreenSize('lg')) { //lg breakpoint
      this.TypeUI = 1;

      if (window.innerWidth <= config.GetScreenSize('sm')) {
        this.grid = 3;
      } else {

        this.grid = 4;
      }
    } else {
      this.TypeUI = 0;
      this.grid = 3;

    }

  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    let preTypeUI = this.TypeUI;
    let preGrid = this.grid;
    this.ComputeStyleUI();
    if (preTypeUI != this.TypeUI) {
      this.slideElements = []
    }
    else
      if (preGrid != this.grid) {
        this.recalpulate();

      }


  }

  OnComicHover(comic: Comic) {
    clearTimeout(this.timer);
    clearInterval(this.interval); // Clear the existing interval
    if (comic == undefined) {
      this._state = 'out';
      return
    }
    this.timer = setTimeout(() => {
      this._state = 'in';
    }, 750);
    this.ComicHover = comic;
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
    clearTimeout(this.timer);
  }

  private startAutoSlide() {
    this.interval = setInterval(() => {
      this.prev();
    }, 4000);
  }

  next() {
    let now = Date.now();
    if (now - this.lastTime < 500) {
      return;
    }
    this.lastTime = now;

    this.recalpulate(true);
  }

  prev() {
    let now = Date.now();
    if (now - this.lastTime < 500) {
      return;
    }
    this.lastTime = now;
    this.recalpulate(false);
  }

  recalpulate(isNext = true): void {


    if (isNext) {
      let last = this.slideElements.pop()!;
      this.slideElements = [last, ...this.slideElements];
    } else {
      let first = this.slideElements.shift()!;
      this.slideElements = [...this.slideElements, first];
    }

    this.slideElements.forEach((e: any, index) => {
      e.style.left = `${((index - 1) * 100) / this.grid}%`;
      e.style.width = `${100 / this.grid}%`;
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
