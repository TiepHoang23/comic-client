import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';

import { ComicService } from '../../../dataSource/services/comic.service';
import { Comic } from '../../../dataSource/schema/comic';
import { Page } from '../../../dataSource/schema/Page';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter } from '../../../dataSource/schema/Chapter';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter-page.component.html',
  styleUrls: ['./chapter-page.component.scss'],
})
export class ChapterPageComponent {
  ListChapterImg: Page[];
  comic!: Comic;
  mainChapter!: Chapter;
  @HostListener('window:scroll', [])
  @ViewChildren('MenuNavigation')
  SearchField!: ElementRef;
  @ViewChild('screenContainer', { static: true }) screenContainer!: ElementRef;
  @ViewChild('imageContainer', { static: true }) imageContainer!: ElementRef;

  private readonly zoomStep: number = 0.2;
  private readonly minZoomLevel: number = 0;
  private readonly maxZoomLevel: number = 1;

  public zoomLevel: number = 0.5;
  public isLimitZoom: boolean = false;

  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.ListChapterImg = [];
  }

  ngOnInit(): void {
    this.zoomLevel = 0;
    this.route.params.subscribe((params) => {
      let chapterid = Number(params['chapterid']);
      this.comicService.getChapterImgs(chapterid).subscribe((res: any) => {
        this.ListChapterImg = res.data.pages;
        this.comic = res.data.comic;
        this.mainChapter = res.data;
      });
    });
  }
  ngOnChanges(): void {}
  ToggleMenu(isToggle: boolean) {
    if (isToggle) {
      this.SearchField.nativeElement.classList.toggle('translate-x-full');
    } else {
      this.SearchField.nativeElement.classList.add('translate-x-full');
    }
  }
  onChangeChapter(event: any) {
    this.OnChangeChapter(event.target.value);
  }
  OnChangeChapter(chapterid: number) {
    this.router.navigate([
      'truyen-tranh',
      this.comic.url,
      'chapter',
      chapterid,
    ]);
  }

  ZoomImage(zoomIn: boolean): void {
    const containerWidth = this.screenContainer.nativeElement.offsetWidth;
    if (zoomIn) {
      this.zoomLevel = Math.min(
        this.zoomLevel + this.zoomStep,
        this.maxZoomLevel,
      );
    } else {
      this.zoomLevel = Math.max(
        this.zoomLevel - this.zoomStep,
        this.minZoomLevel,
      );
    }
    if (this.zoomLevel === this.minZoomLevel) {
      this.isLimitZoom = false;
      return;
    }
    const imageContainerWidth = this.imageContainer.nativeElement.offsetWidth;
    const scaledWidth = this.zoomLevel * imageContainerWidth;

    if (scaledWidth >= containerWidth && zoomIn) {
      this.isLimitZoom = true;
      this.zoomLevel -= this.zoomStep;
      return;
    }
  }

  resetView(): void {
    this.isLimitZoom = false;
    this.zoomLevel = this.minZoomLevel;
  }

  getZoomPercentage(): string {
    return Math.round(this.zoomLevel * 100) + 100 + '%';
  }
}
