import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Genre } from '../../dataSource/schema/Genre';
import { Observable } from 'rxjs';
import { ComicService } from '../../dataSource/services/comic.service';
import { DOCUMENT } from '@angular/common';
import { EventEmitter } from 'stream';
import { Target } from '@angular/compiler';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  listGenre: Array<Array<Genre>> = new Array<Array<Genre>>;
  searchText: string = "";
  doneTypingInterval = 200;
  typingTimer: any;
  @ViewChild('SearchInput') SearchField!: ElementRef;
  constructor(private comicService: ComicService, @Inject(DOCUMENT) private document: Document) { }
  ngOnInit() {
    this.comicService.getGenres().subscribe(genres => {
      let nrow = Math.ceil(genres.length / 5);
      for (let i = 0; i < 5; i++) {
        this.listGenre.push(genres.slice(i * nrow, i * nrow + nrow));
      }

    }
    );
  }
  OnSearchChange(e:Event)
  {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
        this.searchText = this.SearchField.nativeElement.value;
    }, this.doneTypingInterval);

  }
  OnSearchFocus(isFoucs: boolean): boolean {
    console.log("focus", isFoucs);
    // if (isFoucs) {
      this.document.getElementById("search-result")?.classList.remove("invisible");
    // }
    // else {
    //   this.document.getElementById("search-result")?.classList.add("invisible");
    // }

    return true;
  }
}
