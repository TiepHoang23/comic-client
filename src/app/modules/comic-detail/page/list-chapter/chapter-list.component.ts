import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '@services/comic.service';
import moment from 'moment';
import config from '../../../../../../GlobalConfig';
type ComicChapters = {
  id: number;
  chapterTitle?: string;
  chapterDescription?: string;
  updateAt?: string;
  viewCount?: number;
};

@Component({
  selector: 'chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrl: './chapter-list.component.scss',
})
export class ChapterListComponent {
  comicChapters!: any[];
  maxChapterPage = 0;
  currentChapterPage = 0;
  @Input()
  comic_url!: string | undefined;
  preload_chapter_num: number = 48;
  chapter_grid_size: number = 3;
  height_each_element: number = 68;
  @ViewChild('ChaptersScrollElement')
  ChapterScroll!: ElementRef<HTMLDivElement>;
  @ViewChild('searchChapterInput')
  searchChapterInput!: ElementRef<HTMLInputElement>;
  @ViewChild('overlay')
  overlayEl!: ElementRef<HTMLElement>;
  $index = 0;
  @Input() allchapters!: ComicChapters[];
  preLoadChapters: ComicChapters[] = [];
  range!: Number[];


  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
  ) {

  }
  ngOnInit() {
    this.CalcGirdSize();
  }

  ngOnChanges(change: any) {
    console.log(change);

    if (!this.allchapters) return;
    this.range = Array.from(
      { length: (this.allchapters.length - 1) / 50 + 1 },
      (_, i) => i,
    );
    this.SetUpScroll();
  }
  CalcGirdSize() {
    if (window.innerWidth < config.GetScreenSize('sm')) {
      //sm breakpoint
      this.chapter_grid_size = 2;
    } else if (window.innerWidth < config.GetScreenSize('xl')) {
      // xl break point
      this.chapter_grid_size = 3;
    } else {
      this.chapter_grid_size = 4;
    }

    return this.chapter_grid_size;
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    let pregrid = this.chapter_grid_size;
    this.CalcGirdSize();

    if (pregrid != this.chapter_grid_size) {
      let nRow =
        Math.floor((this.allchapters.length - 1) / this.chapter_grid_size) + 1;
      this.maxChapterPage = Math.ceil(
        (this.allchapters.length + 1) / this.preload_chapter_num - 1,
      );
      this.overlayEl.nativeElement.style.height = `${nRow * this.height_each_element}px`;
    }
  }

  onSearchChapter(e: any) {
    const value: string = e.target.value?.toLowerCase();
    if (!value) {
      this.preLoadChapters = this.allchapters;
      return;
    }
    this.preLoadChapters = this.allchapters.filter((chapter) =>
      chapter.chapterTitle?.toLowerCase().includes(value),
    );
  }
  SetUpScroll() {
    this.preLoadChapters = [];
    this.preLoadChapters.push(
      ...this.allchapters.slice(0, this.preload_chapter_num),
    );
    let nRow =
      Math.floor((this.allchapters.length - 1) / this.chapter_grid_size) + 1;
    this.maxChapterPage = Math.ceil(
      (this.allchapters.length + 1) / this.preload_chapter_num - 1,
    );
    this.overlayEl.nativeElement.style.height = `${nRow * this.height_each_element}px`;
    this.currentChapterPage = 1;
    this.ChapterScroll.nativeElement.onscroll = this.Onscroll;
  }
  Onscroll = (e: any) => {
    if (this.currentChapterPage > this.maxChapterPage) return;
    let numpage = Math.floor(e.target.scrollTop / (this.height_each_element)) / (this.preload_chapter_num / this.chapter_grid_size) + 1;
    let curpage = this.currentChapterPage
    let num = Math.max(numpage - curpage, 0);
    num = Math.ceil(num);
    if (num > 0) {
      let Loffset = this.currentChapterPage * this.preload_chapter_num;
      this.currentChapterPage += num;
      let Roffset = this.currentChapterPage * this.preload_chapter_num;
      this.preLoadChapters.push(...this.allchapters.slice(Loffset, Roffset));
    }

  };
  selectChapterRange(event: any) {
    const selectedValue =
      this.range.length - 1 - Number((event.target as HTMLSelectElement).value); // Type assertion

    let value = (selectedValue * 50) / this.chapter_grid_size;
    this.height_each_element;

    this.chapter_grid_size;

    this.ChapterScroll.nativeElement.scrollTo({
      top: this.height_each_element * value,
      left: 0,
      // behavior: 'smooth',
    });
  }
}
