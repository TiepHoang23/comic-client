import { Component, ElementRef, Output, ViewChild } from '@angular/core';
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
  currentpage: number = 1
  totalpage: number = 1
  constructor(private comicService: ComicService,
    private accountService: AccountService,
    private route: ActivatedRoute) {
  }
  // @Output() Click: any;
  ngOnInit(): void {

    this.accountService
      .FollowedComics().subscribe((res: any) => {
        this.comics = res.data;
      })
    console.log(this.accountService);

  }
  getInstance() {
    return this
  }

  onUnFollowClick(id: Number) {


    this.accountService.Follow(id, false).subscribe((res: any) => {
      if (res.status === 1) {
        this.comics = this.comics.filter((c) => c.id !== id);
      }
    });

  }


}
