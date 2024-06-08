import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  SimpleChange,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Page } from '../../dataSource/schema/Page';
import { Comic } from '../../dataSource/schema/comic';
import { Chapter } from '../../dataSource/schema/Chapter';
import { ComicService } from '@services/comic.service';
import { ImageService } from '@services/image.service';
import { HistoryService } from '@services/history.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter-page.component.html',
  styleUrls: ['./chapter-page.component.scss'],
})
export class ChapterPageComponent {
  ListChapterImg: Page[];
  comic!: Comic;
  mainChapter!: Chapter;
  isHovered!: boolean;

  @ViewChildren('MenuNavigation')
  SearchField!: ElementRef;
  @ViewChild('screenContainer', { static: true }) screenContainer!: ElementRef;
  @ViewChild('imageContainer', { static: true }) imageContainer!: ElementRef;
  @ViewChild('controlBar', { static: true }) controlBar!: ElementRef;

  private readonly zoomStep: number = 0.2;
  private readonly minZoomLevel: number = 0;
  private readonly maxZoomLevel: number = 1;

  public zoomLevel: number = 0.5;
  public defaultZoomLevel: number = 0.3;
  public isLimitZoom: boolean = false;

  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
    private historyService: HistoryService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.ListChapterImg = [];
  }
  ngOnInit(): void {
    this.zoomLevel = this.defaultZoomLevel;
    // Signal to cancel the previous request

    this.route.params.subscribe((params) => {
      let chapterid = Number(params['chapterid']);
      this.comicService.getChapterImgs(chapterid).subscribe((res: any) => {
        this.ListChapterImg = res.data.pages;
        this.comic = res.data.comic;
        this.mainChapter = res.data;

        this.historyService.SaveHistory(this.comic, {
          id: this.mainChapter.id,
          title: this.mainChapter.title,
          slug: this.mainChapter.slug,
          updateAt: this.mainChapter.updateAt,
          viewCount: this.mainChapter.viewCount,
        })
      })
      this.imageService.CancelAll();
    });
  }
  ngOnChanges(change: SimpleChange): void { }
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
  OnChangeChapter(chapterId: number) {
    this.router.navigate([
      'truyen-tranh',
      this.comic.url,
      'chapter',
      chapterId,
    ]);
  }

  ZoomImage(zoomIn: boolean): void {
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
    if (this.zoomLevel <= this.minZoomLevel && !zoomIn) {
      this.isLimitZoom = false;
      return;
    }
    const imageContainerWidth = this.imageContainer.nativeElement.offsetWidth;
    const containerWidth = this.screenContainer.nativeElement.offsetWidth;
    const scaledWidth = this.zoomLevel * imageContainerWidth;

    if (scaledWidth >= containerWidth && zoomIn) {
      this.isLimitZoom = true;
      return;
    }
  }

  resetView(): void {
    this.isLimitZoom = false;
    this.zoomLevel = this.minZoomLevel + this.defaultZoomLevel;
  }

  getZoomPercentage(): number {
    return Math.round((this.zoomLevel - this.defaultZoomLevel) * 100) + 100;
  }

  @HostListener('document:keydown.arrowleft', ['$event'])
  onNextChapter(): void {
    this.navigateChapter(true);
  }
  @HostListener('document:keydown.arrowright', ['$event'])
  onPreviousChapter(): void {
    this.navigateChapter(false);
  }

  navigateChapter(next: boolean): void {
    const currentChapterIndex = this.comic.chapters!.findIndex(
      (chapter) => chapter.id === this.mainChapter.id,
    );
    const targetChapterIndex = next
      ? currentChapterIndex + 1
      : currentChapterIndex - 1;

    if (
      targetChapterIndex >= 0 &&
      targetChapterIndex < this.comic.chapters!.length
    ) {
      const targetChapter = this.comic.chapters![targetChapterIndex];
      this.OnChangeChapter(targetChapter.id);
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(): void {
    this.exitFullscreen();
  }
  enterFullscreen(): void {
    // this.zoomLevel = 0.5;
    const elem = this.imageContainer.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      // IE/Edge
      elem.msRequestFullscreen();
    }
  }

  exitFullscreen(): void {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    }
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleHover(state: boolean) {
    this.isHovered = state;
  }
}
