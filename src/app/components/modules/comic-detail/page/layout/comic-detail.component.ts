import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ComicService } from '../../../../../dataSource/services/comic.service';
import { Comic } from '../../../../../dataSource/schema/comic';


@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrl: './comic-detail.component.scss',
})
export class ComicDetailComponent implements OnInit {
  comic!: Comic;
  listTopComics?: Comic[];
  $index = 0;

  constructor(private route: ActivatedRoute, private ComicService: ComicService, private location: Location) {
  }

  ngOnInit(): void {
    this.getComic();
    this.getTopComics();
  }

  getComic(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ComicService.getComicById(id)
      .subscribe(comic => this.comic = comic);
  }

  getTopComics(): void {
    this.ComicService.getTopComics()
      .subscribe(topComics => this.listTopComics = topComics);

  }

  goBack(): void {
    this.location.back();
  }

}
