import { Component, OnInit } from '@angular/core';
import { Comic } from '../../../../dataSource/schema/comic';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ComicService } from '../../../../dataSource/services/comic.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrl: './comic-detail.component.scss',
})
export class ComicDetailComponent  implements OnInit {
  comic!: Comic;

  constructor(private route: ActivatedRoute, private ComicService: ComicService , private location: Location) {
  }

  ngOnInit(): void {
    this.getComic();
  }

  getComic(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ComicService.getComicById(id)
      .subscribe(comic => this.comic = comic);
  }

  goBack(): void {
    this.location.back();
  }

}
