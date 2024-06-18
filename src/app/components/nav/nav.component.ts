import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Genre } from '../../dataSource/schema/Genre';
// import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../dataSource/schema/User';
import { ComicService } from '@services/comic.service';
import { AccountService } from '@services/account.service';
import { ImageService } from '@services/image.service';
import { ThemeService } from '@services/theme.service';
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

  avatar!: string
  user?: IUser;
  showslidebar = false;
  @ViewChild('dropdownNavbar') dropdownNavbar!: ElementRef;
  constructor(
    private comicService: ComicService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService,
    public themeService: ThemeService
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
  toggleSidebar() {
    this.showslidebar = !this.showslidebar
    this.dropdownNavbar.nativeElement.classList.toggle('hidden');
  }

}
