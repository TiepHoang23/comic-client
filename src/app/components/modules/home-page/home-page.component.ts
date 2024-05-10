import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ComicService } from '../../../dataSource/services/comic.service';
import { Comic } from '../../../dataSource/schema/comic';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  listComics: Comic[] = [];
  totalpage!: number;
  listTopComics?: Comic[];
  constructor(
    private route: ActivatedRoute,
    private ComicService: ComicService,
  ) {
    // this.pages = Array.from({ length: 10 }, (_, i) => i + 1).map(String);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let page = Number(params['page']) || 1;
      this.OnChangePage(page);
      this.getTopComics();
    });
  }

  OnChangePage(page: number) {
    this.listComics = [];
    this.ComicService.getComics(page).subscribe((res: any) => {
      if (!this.totalpage) {
        this.totalpage = res.data.totalpage;
      }
      this.listComics = res.data.comics;
    });
  }
  getTopComics(): void {
    this.ComicService.getTopComics({ top: 15 }).subscribe((topComics) => {
      this.listTopComics = topComics?.data?.comics;
    });
  }
}
