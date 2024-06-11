import { Component, Input } from '@angular/core';
import { Comic } from '../../../dataSource/schema/comic';
import { ComicService } from '@services/comic.service';
import { TopType } from 'src/app/dataSource/enum';

@Component({
  selector: 'app-top-list',
  templateUrl: './top-list.component.html',
  styleUrl: './top-list.component.scss',
})
export class TopListComponent {
  @Input() listTopComics!: Comic[];
  topType!: number;
  constructor(private ComicService: ComicService) {}

  ngOnInit(): void {
    this.topType = TopType.Day;
    this.getTopComicDay();
  }
  getTopComicDay(): void {
    this.ComicService.getTopComics({ top: 6 }).subscribe(
      (topComics: any) => (this.listTopComics = topComics?.data?.comics),
    );
  }
  getTopComicWeek(): void {
    this.ComicService.getTopComics({ top: 6 }).subscribe(
      (topComics: any) => (this.listTopComics = topComics?.data?.comics),
    );
  }
  getTopComicMonth(): void {
    this.ComicService.getTopComics({ top: 6 }).subscribe(
      (topComics: any) => (this.listTopComics = topComics?.data?.comics),
    );
  }
  getTopComic(topType: number): void {
    switch (topType) {
      case TopType.Week:
        this.topType = TopType.Week;
        this.getTopComicWeek();
        break;
      case TopType.Month:
        this.topType = TopType.Month;
        this.getTopComicMonth();
        break;

      default:
        this.topType = TopType.Day;
        this.getTopComicDay();
        break;
    }
  }
}
