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
import { animate, state, style, transition, trigger } from '@angular/animations';
import { forEach } from 'lodash';
// import { EventEmitter } from 'stream';
// import { Target } from '@angular/compiler';
// import { partition } from 'lodash';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  animations: [
    trigger('showHide', [
      state('hidden', style({ opacity: 0.5, transform: 'scale(0.75)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hidden <=> visible', [animate('200ms ease-in-out')])
    ])
  ]
})
export class NavComponent {
  listGenres: Array<Genre> = new Array<Genre>();
  searchText: string = '';

  avatar!: string
  user?: IUser;
  showslidebar = false;
  showaccount = false;
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
    this.showaccount = !this.showaccount
  }
  toggleSidebar() {
    this.showslidebar = !this.showslidebar
    let height = 0;
    for (const child of this.dropdownNavbar.nativeElement.children) {
      height += child.getBoundingClientRect().height
    }
    if (this.showslidebar) {
      //set height style
      this.dropdownNavbar.nativeElement.style.height = height + 'px';
    } else {
      this.dropdownNavbar.nativeElement.style.height = '0px';
    }
  }


}
