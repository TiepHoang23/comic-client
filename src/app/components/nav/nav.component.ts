import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Genre } from '../../dataSource/schema/Genre';
// import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../dataSource/schema/User';
import { ComicService } from '@services/comic.service';
import { AccountService } from '@services/account.service';
import { ImageService } from '@services/image.service';
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
  searchText: string = '';
  doneTypingInterval = 200;
  typingTimer: any;
  isSearching = false;
  avatar!: string
  user?: IUser;
  @ViewChild('SearchInput') SearchField!: ElementRef;
  constructor(
    private comicService: ComicService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService
  ) { }
  ngOnInit() {
    this.comicService.getGenres().subscribe((genres) => {
      this.listGenres = genres;
    });
    this.user = this.accountService.GetUser();

    this.avatar = this.accountService.addTimestampToUrl(this.user!.avatar!)
    this.imageService.imageUrl$.subscribe(url => {
      if (url)
        this.avatar = url;

    });


  }
  onLoginClick() {
    this.router.navigate(['auth/login']);
  }
  onRegisterClick() {
    this.router.navigate(['auth/register']);
  }
  ngOnChanges(change: any) { }
  onLogoutClick() {
    this.accountService.Logout();
  }
  onUserClick() {
    document.getElementById('user-dropdown')?.classList.toggle('invisible');
  }
  OnSearchChange(e: Event) {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.searchText = this.SearchField.nativeElement.value;
    }, this.doneTypingInterval);
  }
  OnSearchFocus = (isFoucs: boolean): boolean => {
    this.isSearching = isFoucs;
    if (isFoucs) this.SearchField.nativeElement.classList.add('!w-full');
    else this.SearchField.nativeElement.classList.remove('!w-full');
    return true;
  };

  clearSearch(): void {
    this.searchText = '';
    this.SearchField.nativeElement.value = '';
  }
}
