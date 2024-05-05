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
  isLoading: boolean = true;
  totalpage!: number
  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
  ) {
    // this.pages = Array.from({ length: 10 }, (_, i) => i + 1).map(String);
  }

  ngOnInit(): void {

    // this.currentPage = Number(this.route.snapshot.queryParams['page']) || 1;
    this.route.queryParams.subscribe(params => {
      let page = Number(params['page']) || 1;
      this.isLoading = true;
      this.OnChangePage(page)
    })

  }

  OnChangePage(page: number) {
    this.comicService.getComics(page).subscribe((res: any) => {
      this.isLoading = false;
      if (!this.totalpage) {
        this.totalpage = res.data.totalpage
      }
      this.listComics = res.data.comics
    });

  }
}
