import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pagination-component',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  pages!: string[];
  @Input() currentPage: number = 1;
  @Input() totalpage!: number;
  @Output() OnChange = new EventEmitter<number>();
  showSearch = false;
  @ViewChild('SearchInput')
  SearchInputElement!: ElementRef;
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void { }
  ngOnChanges() {
    if (this.totalpage) {
      this.PageSetup(Number(this.currentPage));
    }
  }
  PageSetup(page: number) {
    this.pages = [];
    if (this.totalpage <= 5) {
      for (let index = 1; index <= this.totalpage; index++)
        this.pages.push(index.toString());
      return;
    }
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
    if (page === "...") {
      this.showSearch = true
      return;
    }
    this.showSearch = false;
    let _pageint = Number(page);
    _pageint = Math.min(this.totalpage, _pageint);
    _pageint = Math.max(1, _pageint);
    if (this.totalpage && _pageint != this.currentPage) {
      this.PageSetup(_pageint);
      this.OnChange.emit(_pageint);
      this.currentPage = _pageint;
    }
  }
  onFocus(value: boolean) {
    if (!value) {
      this.showSearch = false;
    }
  }
}
