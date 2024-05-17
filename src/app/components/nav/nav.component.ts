import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Genre } from '../../dataSource/schema/Genre';
// import { Observable } from 'rxjs';
import { ComicService } from '../../dataSource/services/comic.service';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
// import { EventEmitter } from 'stream';
// import { Target } from '@angular/compiler';
// import { partition } from 'lodash';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  listGenres: Array<Genre> = new Array<Genre>();
  // catagoriesGenre: Map<string, Genre[]> = new Map();
  searchText: string = '';
  doneTypingInterval = 200;
  typingTimer: any;
  @ViewChild('SearchInput') SearchField!: ElementRef;
  constructor(
    private comicService: ComicService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) { }
  ngOnInit() {
    this.comicService.getGenres().subscribe((genres) => {
      this.listGenres = genres;
    });
  }
  onLoginClick() {
    this.router.navigate(['auth/login']);
  }
  onRegisterClick() {
    this.router.navigate(['auth/register']);
  }
  OnSearchChange(e: Event) {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.searchText = this.SearchField.nativeElement.value;
    }, this.doneTypingInterval);
  }
  OnSearchFocus = (isFoucs: boolean): boolean => {
    if (isFoucs) {
      this.document
        .getElementById('search-result')
        ?.classList.remove('invisible');
    } else {
      this.document.getElementById('search-result')?.classList.add('invisible');
    }

    return true;
  };
}
