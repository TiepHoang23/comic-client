import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Comic } from '../../../dataSource/schema/comic';
import { ComicService } from '@services/comic.service';

@Component({
  selector: 'list-search-comic',
  templateUrl: './list-search-comic.component.html',
  styleUrl: './list-search-comic.component.scss',
})
export class ListSearchComicComponent implements OnInit {
  listSearch: Comic[] = [];
  isSearching = false;
  typingTimer: any;
  searchText: string = '';
  doneTypingInterval = 300;
  @ViewChild('SearchInput') SearchInput!: ElementRef;
  @ViewChild('SearchFrame') SearchFrame!: ElementRef;

  constructor(private comicService: ComicService) {}
  ngOnInit() {}
  ngOnChanges(change: any) {}
  SendSearchReq() {
    if (this.searchText != '') {
      this.comicService
        .getSearchComic(this.searchText)
        .subscribe((res: any) => {
          this.listSearch = res.data;
        });
    } else {
      this.listSearch = [];
    }
  }
  OnSearchChange(e: Event) {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.searchText = this.SearchInput.nativeElement.value;
      this.SendSearchReq();
    }, this.doneTypingInterval);
  }
  OnSearchFocus = (isFoucs: boolean): boolean => {
    this.isSearching = isFoucs;
    if (isFoucs) {
      this.SearchInput.nativeElement.classList.add('!w-full');
    } else {
      this.SearchFrame.nativeElement.classList.add('hidden');
      this.SearchInput.nativeElement.classList.remove('!w-full');
    }

    return true;
  };
  OnSearchClick = (): boolean => {
    this.SearchFrame.nativeElement.classList.remove('hidden');
      this.SearchInput.nativeElement.focus();

    return true;
  };

  clearSearch(): void {
    this.searchText = '';
    this.SearchInput.nativeElement.value = '';
    this.listSearch = [];
  }
}
