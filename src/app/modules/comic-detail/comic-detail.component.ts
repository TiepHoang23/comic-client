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
import config from '../../../../GlobalConfig';
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
  allchapters!: ComicChapters[];
  range!: Number[];
  SimilarComics?: Comic[] = [];
  isOpen = false;
  followtime: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ComicService: ComicService,
    private titleService: Title,
    private accountService: AccountService,
    private historyService: HistoryService,
    private toastService: ToastService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.getComic(id);
    });

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

      this.getSimilarComics();

    });
    // const id = this.route.snapshot.paramMap.get('id') || '';
  }





  getSimilarComics(): void {
    this.ComicService.getSimilarComic(this.comic.id).subscribe((res: any) => {
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
        `Thao tác quá nhanh!`,
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
