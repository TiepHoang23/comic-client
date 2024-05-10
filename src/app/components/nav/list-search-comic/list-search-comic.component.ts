import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComicService } from '../../../dataSource/services/comic.service';
import { Comic } from '../../../dataSource/schema/comic';

@Component({
  selector: 'list-search-comic',
  templateUrl: './list-search-comic.component.html',
  styleUrl: './list-search-comic.component.scss',
})
export class ListSearchComicComponent implements OnInit {
  listSearch: Comic[] = [];
  @Input()
  searchValue: string = '';

  @Output() CloseEvent = new EventEmitter<string>();
  constructor(private comicService: ComicService,) {

  }
  close() {
    this.CloseEvent.emit();
  }
  ngOnInit() {

  }
  ngOnChanges() {
    if (this.searchValue != "") {
      this.comicService.getSearchComic(this.searchValue).subscribe(
        (res: any) => {
          this.listSearch = res.data
        }
      )

    }
    else {
      this.listSearch = []
    }
  }

}
