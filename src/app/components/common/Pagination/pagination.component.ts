import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { OverlayContainer } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';
import { ComicService } from '../../../dataSource/services/comic.service';



@Component({
  selector: 'pagination-component',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  pages!: string[];
  currentPage!: string
  @Input() totalpage!: number
  constructor(
    private route: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.currentPage = String(Number(params['page']) || 1);
      this.OnChangePage(Number(this.currentPage));
    })

  }
  ngOnChanges() {

    this.OnChangePage(Number(this.currentPage))
  }
  PageSetup(page: number) {
    console.log(page, this.totalpage);

    this.pages = []//Array.from({ length: 10 }, (_, i) => i + page).map(String);
    if (page <= 3) {
      for (let index = Math.max(1, page - 2); index <= Math.max(page + 2, 3); index++)
        this.pages.push(index.toString());
      this.pages.push('...', this.totalpage.toString())

    }
    else {
      this.pages.push("1", "...")
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

    if (this.totalpage)
      this.PageSetup(page)
  }
}

