import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ComicService } from '../../../../../dataSource/services/comic.service';
import { Comic } from '../../../../../dataSource/schema/comic';
import moment from 'moment-timezone';

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
  listTopComics?: Comic[];
  $index = 0;
  isOpen = false;

  constructor(
    private route: ActivatedRoute,
    private ComicService: ComicService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getComic();
    this.getTopComics();

  }
  saveHistory(comicKey: string) {
    if (localStorage.getItem("history") === null) {
      localStorage.setItem("history", JSON.stringify([comicKey]))
      return;
    }
    let history = localStorage.getItem("history") as string
    let his = JSON.parse(history) as string[]
    if (his.includes(comicKey)) return
    his.push(comicKey)

    // history.push(comicKey)
    localStorage.setItem("history", JSON.stringify(his))
  }

  getComic(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.ComicService.getComicById(id).subscribe((res) => {
      this.saveHistory(id)
      this.comic = res.data ?? ({} as Comic);

      this.comicChapters = (res.data?.chapters ?? []).map((chapter) => {
        const [chapterTitle, chapterDescription] =
          chapter.title?.split(':') ?? [];
        // const isToDay = new Date(chapter.updateAt)..toDateString() === new Date().toDateString()
        return {
          id: chapter.id,
          chapterTitle,
          chapterDescription,
          updateAt: moment(chapter.updateAt).format('DD/MM'),
          viewCount: chapter.viewCount,
        };
      });
    });
  }

  getTopComics(): void {
    this.ComicService.getTopComics().subscribe(
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
