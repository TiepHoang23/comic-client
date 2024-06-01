import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import _ from 'lodash';
import { Comic } from '../../dataSource/schema/comic';
import { ComicService } from '@services/comic.service';


@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  listComics: Comic[] = [];
  totalpage!: number;
  listTopComics?: Comic[];
  currentPage = 1;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ComicService: ComicService,
    private viewportScroller: ViewportScroller
  ) {
    // this.pages = Array.from({ length: 10 }, (_, i) => i + 1).map(String);
  }

  ngOnInit(): void {
    this.getTopComics();

    this.route.queryParams.subscribe((params) => {
      let page = Number(params['page']) || 1;
      this.currentPage = page;
      this.RefreshPage(page);
    });
  }
  ngAfterViewInit() {
  }

  RefreshPage(page: number): void {
    this.listComics = [];

    this.ComicService.getComics(page, 40, 21, 1, -1).subscribe((res: any) => {
      if (!this.totalpage) {
        this.totalpage = res.data.totalpage;
      }
      this.listComics = res.data.comics;
    })
  }
  OnChangePage(page: number) {
    this.router.navigate([''], { queryParams: { page: page }, fragment: 'listComic' });
  }
  getTopComics(): void {
    this.ComicService.getTopComics({ top: 15 }).subscribe((topComics) => {
      this.listTopComics = topComics?.data?.comics;
    });
  }
}
