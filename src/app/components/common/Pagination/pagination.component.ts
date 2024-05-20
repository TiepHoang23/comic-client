import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() currentPage: string = '1';
  @Input() totalpage!: number;
  @Output() OnChange = new EventEmitter<number>();
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {}
  ngOnChanges() {
    if (this.totalpage) {
      this.PageSetup(Number(this.currentPage));
    }
  }
  PageSetup(page: number) {
    this.pages = [];
    if (page <= 3) {
      for (
        let index = Math.max(1, page - 2);
        index <= Math.max(page + 2, 3);
        index++
      )
        this.pages.push(index.toString());
      this.pages.push('...', this.totalpage.toString());
    } else {
      this.pages.push('1', '...');
      if (page <= this.totalpage - 3) {
        for (
          let index = Math.max(1, page - 1);
          index <= Math.max(page + 1, 3);
          index++
        )
          this.pages.push(index.toString());

        this.pages.push('...', this.totalpage.toString());
      } else {
        page = Math.max(this.totalpage, page);
        for (
          let index = Math.min(this.totalpage - 3, page);
          index <= Math.max(page, this.totalpage);
          index++
        )
          this.pages.push(index.toString());
      }
    }
  }

  OnChangePage(page: string) {
    let _pageint = Number(page);
    if (this.totalpage) {
      this.PageSetup(_pageint);
      this.OnChange.emit(_pageint);
      this.currentPage = page;
    }
  }
}
