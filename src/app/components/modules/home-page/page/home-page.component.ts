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
  pages!: string[];
  isLoading: boolean = true;
  currentPage!: string
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
      this.currentPage = String(Number(params['page']) || 1);
      this.isLoading = true;
      this.OnChangePage(Number(this.currentPage));
    })

  }
  PageSetup(page: number) {
    this.pages = []//Array.from({ length: 10 }, (_, i) => i + page).map(String);
    if (page <= 3) {
      for (let index = Math.max(1, page - 2); index <= Math.max(page + 2, 3); index++)
        this.pages.push(index.toString());

      this.pages.push('...')
      this.pages.push(this.totalpage.toString())
    }
    else {
      this.pages.push('1')
      this.pages.push('...')
      if (page <= this.totalpage - 3) {
        for (let index = Math.max(1, page - 1); index <= Math.max(page + 1, 3); index++)
          this.pages.push(index.toString());

        this.pages.push('...')
        this.pages.push(this.totalpage.toString())
      }
      else {
        page = Math.max(this.totalpage, page)
        for (let index = Math.min(this.totalpage - 3, page); index <= Math.max(page, this.totalpage); index++)
          this.pages.push(index.toString());

      }
    }
  }

  OnChangePage(page: number) {
    this.comicService.getComics(page).subscribe((res: any) => {
      this.isLoading = false;
      if (!this.totalpage) {
        this.totalpage = res.data.totalpage
        this.PageSetup(page)
      }
      this.listComics = res.data.comics
    });
    if (this.totalpage)
      this.PageSetup(page)
  }
}
