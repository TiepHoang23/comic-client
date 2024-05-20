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
import { ComicService } from '../../../dataSource/services/comic.service';
import { Comic } from '../../../dataSource/schema/comic';
import moment from 'moment-timezone';
import { Observable, of } from 'rxjs';
import { AccountService } from '../../../dataSource/services/account.service';
import { offset } from '@popperjs/core';
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
  listTopComics?: Comic[];
  $index = 0;
  isOpen = false;
  // preload variable
  maxChapterPage = 0;
  currentChapterPage = 0;
  preload_chapter_num: number = 90;
  chapter_grid_size: number = 3;
  height_each_element: number = 68;
  @ViewChild('ChaptersScrollElement') SearchField!: ElementRef<HTMLDivElement>;
  overlayEl!: HTMLElement;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ComicService: ComicService,
    private location: Location,
    private accountService: AccountService,
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
    if (localStorage.getItem('history') === null) {
      localStorage.setItem('history', JSON.stringify([comic]));
      return;
    }
    let history = localStorage.getItem('history') as string;
    let his = JSON.parse(history) as Comic[];
    if (his.find((c) => c.id === comic.id)) return;
    his.push(comic);
    localStorage.setItem('history', JSON.stringify(his));
  }

  getComic(id: string): void {
    this.ComicService.getComicById(id).subscribe((res) => {
      this.comic = res.data ?? ({} as Comic);
      this.isFollowed = this.comic.isFollow || false;

      this.saveHistory(this.comic);
      this.allchapters = (res.data?.chapters ?? []).map((chapter) => {
        const [chapterTitle, chapterDescription] =
          chapter.title?.split(':') ?? [];
        // const isToDay = new Date(chapter.updateAt)..toDateString() === new Date().toDateString()
        return {
          id: chapter.id,
          chapterTitle,
          chapterDescription,
          updateAt: chapter.updateAt,
          viewCount: chapter.viewCount,
        };
      });
      this.SetUpScroll();
    });
    // const id = this.route.snapshot.paramMap.get('id') || '';
  }

  CalcGirdSize() {
    if (window.innerWidth < 768) {
      //sm breakpoint
      this.chapter_grid_size = 1;
    } else if (window.innerWidth < 1100) {
      // xl break point
      this.chapter_grid_size = 2;
    } else {
      this.chapter_grid_size = 3;
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
        (this.allchapters.length + 1) / this.preload_chapter_num - 1
      );
      this.overlayEl.style.height = `${nRow * this.height_each_element}px`;
    }
  }
  SetUpScroll() {
    this.preLoadChapters.push(
      ...this.allchapters.slice(0, this.preload_chapter_num)
    );
    let nRow =
      Math.floor((this.allchapters.length - 1) / this.chapter_grid_size) + 1;
    this.maxChapterPage = Math.ceil(
      (this.allchapters.length + 1) / this.preload_chapter_num - 1
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
  }

  getTopComics(): void {
    this.ComicService.getTopComics({ top: 6 }).subscribe(
      (topComics) => (this.listTopComics = topComics?.data?.comics)
    );
  }
  onRatingChanged(rating: number) {
    // Implement your logic here
    console.log('Rating changed:', rating);
  }
  Follow(isFollow: boolean): void {
    if (this.accountService.GetUser() === null) {
      this.router.navigate(['/auth/login']);
    } else {
      console.log(isFollow);
      this.accountService
        .Follow(this.comic.id, isFollow)
        .subscribe((res: any) => {
          if (res.status === 1) {
            this.comic.isFollow = !this.comic.isFollow;
          }
        });
    }
  }
}
