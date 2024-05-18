import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ComicService } from '../../../dataSource/services/comic.service';
import { ActivatedRoute } from '@angular/router';
import { Comic } from '../../../dataSource/schema/comic';
import { url } from 'inspector';
import { AccountService } from '../../../dataSource/services/account.service';

@Component({
  selector: 'followed-tag',
  templateUrl: './followed-page.component.html',
  styleUrls: ['./followed-page.component.scss'],
})
export class FollowedPageComponent {
  comics: Comic[] = [];
  constructor(private comicService: ComicService,
    private accountService: AccountService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.accountService
      .FollowedComics().subscribe((res: any) => {
        this.comics = res.data;
      })

  }

  onUnFollowClick(comic: Comic) {
    console.log(comic);

  }


}
