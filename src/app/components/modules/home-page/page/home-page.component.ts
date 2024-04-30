import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ComicService } from '../../../../dataSource/services/comic.service';
import { Comic } from '../../../../dataSource/schema/comic';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',

  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  listComics: Comic[] = [];
  pages: number[]
  constructor(private route: ActivatedRoute, private comicService: ComicService) {

    this.pages = Array.from({ length: 10 }, (_, i) => i + 1);
  }
  ngOnInit(): void {

    console.log(this.listComics)
    let page = Number(this.route.snapshot.queryParams['page']) || 1;
    this.route.params.subscribe(params => {

      this.pages = Array.from({ length: 10 }, (_, i) => i + page);;
      this.comicService.getComics(page).subscribe((res: any) => {
        this.listComics = res.data
      });
    })
  }
}
