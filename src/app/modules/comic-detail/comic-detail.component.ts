import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT, Location, ViewportScroller } from '@angular/common';
import moment from 'moment-timezone';
import { Observable, of } from 'rxjs';
import { offset } from '@popperjs/core';
import { Title } from '@angular/platform-browser';
import { Comic } from '../../dataSource/schema/comic';

import { HistoryService } from '@services/history.service';
import { ComicService } from '@services/comic.service';
import { AccountService } from '@services/account.service';
import { ToastService, ToastType } from '@services/toast.service';
import chunk from 'lodash/chunk';
import { Target } from '@angular/compiler';
// import {theme } from '../../../../../tailwind.config';
type ComicChapters = {
  id: number;
  chapterTitle?: string;
  chapterDescription?: string;
  updateAt?: string;
  viewCount?: number;
};

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrl: './comic-detail.component.scss',
})
export class ComicDetailComponent implements OnInit {
  comic!: Comic;
  isFollowed!: boolean;
  preLoadChapters: ComicChapters[] = [];
  allchapters!: ComicChapters[];
  range!: Number[];
  // rangeChapters! Number[][];:
  listTopComics?: Comic[];
  SimilarComics?: Comic[] = [];
  $index = 0;
  isOpen = false;
  // preload variable
  maxChapterPage = 0;
  currentChapterPage = 0;
  preload_chapter_num: number = 90;
  chapter_grid_size: number = 3;
  height_each_element: number = 68;
  followtime: number = 0;
  @ViewChild('ChaptersScrollElement') SearchField!: ElementRef<HTMLDivElement>;
  overlayEl!: HTMLElement;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ComicService: ComicService,
    private titleService: Title,
    private accountService: AccountService,
    private historyService: HistoryService,
    private toastService: ToastService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.getComic(id);
      this.getTopComics();
    });
    this.CalcGirdSize();
    this.overlayEl = this.document.getElementById('overlay')!;
  }

  saveHistory(comic: Comic) {
    this.historyService.SaveHistory(comic);
  }

  getComic(id: string): void {
    this.ComicService.getComicById(id).subscribe((res) => {
      this.comic = res.data ?? ({} as Comic);
      this.isFollowed = this.comic.isFollow || false;
      this.titleService.setTitle(`${this.comic.title} - Truyện Tranh`);

      this.saveHistory(this.comic);
      this.allchapters = (this.comic?.chapters ?? []).map((chapter) => {
        const [chapterTitle, chapterDescription] =
          chapter.title?.split(':') ?? [];
        return {
          id: chapter.id,
          chapterTitle,
          chapterDescription,
          updateAt: chapter.updateAt,
          viewCount: chapter.viewCount,
        };
      });
      // this.rangeChapters = chunk(
      //   this.allchapters.map((c) => c.id).reverse(),
      //   50,
      // );
      // console.log(this.rangeChapters);
      this.range = Array.from(
        { length: (this.allchapters.length - 1) / 50 + 1 },
        (_, i) => i,
      );
      this.getSimilarComics();
      this.SetUpScroll();
    });
    // const id = this.route.snapshot.paramMap.get('id') || '';
  }

  CalcGirdSize() {
    if (window.innerWidth < 768) {
      //sm breakpoint
      this.chapter_grid_size = 2;
    } else if (window.innerWidth < 1100) {
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
      this.overlayEl.style.height = `${nRow * this.height_each_element}px`;
    }
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
    this.overlayEl.style.height = `${nRow * this.height_each_element}px`;
    this.currentChapterPage = 1;
    let breakpoint_height =
      ((this.preload_chapter_num / 2 - 1) / 3 + 1) * this.height_each_element;
    this.SearchField.nativeElement.onscroll = (e: any) => {
      if (this.currentChapterPage > this.maxChapterPage) return;
      if (e.target.scrollTop > breakpoint_height * this.currentChapterPage) {
        let Loffset = this.currentChapterPage * this.preload_chapter_num;
        this.currentChapterPage++;
        let Roffset = this.currentChapterPage * this.preload_chapter_num;
        this.preLoadChapters.push(...this.allchapters.slice(Loffset, Roffset));
      }
    };
    console.log(this.allchapters);
  }
  selectChapterRange(event: any) {
    const selectedValue =
      this.range.length - 1 - Number((event.target as HTMLSelectElement).value); // Type assertion

    let value = (selectedValue * 50) / this.chapter_grid_size;
    this.height_each_element;

    this.chapter_grid_size;

    this.SearchField.nativeElement.scrollTo({
      top: this.height_each_element * value,
      left: 0,
      behavior: 'smooth',
    });
  }

  getTopComics(): void {
    this.ComicService.getTopComics({ top: 6 }).subscribe(
      (topComics:any) => (this.listTopComics = topComics?.data?.comics),
    );
  }
  getSimilarComics(): void {
    this.ComicService.getSimilarComic(this.comic.id).subscribe((res: any) => {
      console.log(res);

      this.SimilarComics = res.data;
    });
  }
  onRatingChanged(rating: number) {
    // Implement your logic here
    console.log('Rating changed:', rating);
  }
  Follow(isFollow: boolean): void {
    let now = Date.now();
    if (this.accountService.GetUser() === null) {
      this.router.navigate(['/auth/login']);
      return;
    }
    if (this.followtime + 5000 > now) {
      this.toastService.show(
        ToastType.Info,
        `Thao tác quá nhanh  </br> Hãy theo dõi sau ${(now - this.followtime + 5000) / 1000}  giây`,
      );
      return;
    }
    this.followtime = now;
    this.accountService
      .Follow(this.comic.id, isFollow)
      .subscribe((res: any) => {
        if (res.status === 1) {
          this.comic.isFollow = !this.comic.isFollow;
          this.toastService.show(
            ToastType.Success,
            this.comic.isFollow ? 'Đã theo dõi' : 'Đã hủy theo dõi',
          );
        } else {
          this.toastService.show(ToastType.Error, res.message);
        }
      });
  }
  onSearchChapter(e: any) {
    const value: string = e.target.value;
    if (value) {
      this.preLoadChapters = this.allchapters.filter((chapter) =>
        chapter.chapterTitle?.includes(value),
      );
    } else {
      this.preLoadChapters = [...this.allchapters];
    }
  }
  // selectChapterRange(e?: any) {
  //   const rangeIndex = e.target.value;
  //   if (rangeIndex >= 0 && rangeIndex < this.rangeChapters.length) {
  //     const selectedRange = this.rangeChapters[rangeIndex];
  //     this.preLoadChapters = this.allchapters.filter((chapter) =>
  //       selectedRange.includes(chapter.id),
  //     );
  //   }
  // }
}
