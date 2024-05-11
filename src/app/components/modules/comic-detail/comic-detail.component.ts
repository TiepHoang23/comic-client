import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { ComicService } from '../../../dataSource/services/comic.service';
import { Comic } from '../../../dataSource/schema/comic';
import moment from 'moment-timezone';
import { Observable, of } from 'rxjs';

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
  comicChapters!: ComicChapters[];
  allchapter!: ComicChapters[];
  listTopComics?: Comic[];
  $index = 0;
  isOpen = false;
  maxChapterPage = 0;
  currentChapterPage = 0;
  @ViewChild('SrollElement') SearchField!: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private ComicService: ComicService,
    private location: Location,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.getComic(id);
      this.getTopComics();
    });
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
      this.saveHistory(this.comic);

      this.allchapter = (res.data?.chapters ?? []).map((chapter) => {
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
      this.setUpScroll();
    });
    // const id = this.route.snapshot.paramMap.get('id') || '';
  }
  setUpScroll() {
    //Tạm thời hard code, sau có responsive thì sửa sau
    let overlay = this.document.getElementById('overlay');
    if (overlay === null) return;
    this.comicChapters = this.allchapter.slice(0, 99);
    this.maxChapterPage = Math.ceil((this.allchapter.length + 1) / 99 - 1);
    let nColumn = Math.floor((this.allchapter.length - 1) / 3) + 1;

    overlay.style.height = `${nColumn * 72}px`;
    this.currentChapterPage = 1;
    this.SearchField.nativeElement.addEventListener('scroll', (e: any) => {
      if (this.currentChapterPage > this.maxChapterPage) return;
      if (e.target.scrollTop > 2304 * this.currentChapterPage) {
        this.currentChapterPage++;
        this.comicChapters = this.allchapter.slice(
          0,
          99 * this.currentChapterPage,
        );
      }
    });
  }

  getTopComics(): void {
    this.ComicService.getTopComics({ top: 10 }).subscribe(
      (topComics) => (this.listTopComics = topComics?.data?.comics),
    );
  }
  onRatingChanged(rating: number) {
    // Implement your logic here
    console.log('Rating changed:', rating);
  }
  goBack(): void {
    this.location.back();
  }
}
