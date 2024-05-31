import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comic } from '../../dataSource/schema/comic';
import { ComicService } from '../../dataSource/services/comic.service';
import { AccountService } from '../../dataSource/services/account.service';
import { ToastService, ToastType } from '../../services/toast.service';

@Component({
  selector: 'followed-tag',
  templateUrl: './followed-page.component.html',
  styleUrls: ['./followed-page.component.scss'],
})
export class FollowedPageComponent {
  comics: Comic[] = [];
  currentpage: number = 1;
  totalpage: number = 1;
  constructor(
    private comicService: ComicService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) { }
  // @Output() Click: any;
  ngOnInit(): void {
    this.reqFollowComics();
  }
  reqFollowComics() {
    this.accountService.FollowedComics().subscribe((res: any) => {
      this.comics = res.data;
      console.log(this.comics);

    });
  }
  getInstance() {
    return this;
  }

  onUnFollowClick(id: Number) {
    let comic = this.comics.find((comic) => comic.id === id)

    this.accountService.Follow(id, false).subscribe((res: any) => {
      if (res.status === 1) {
        this.reqFollowComics();
        this.toastService.show(ToastType.Success, `Đã bỏ theo dõi ${comic!.title}`);
      }
      else {
        this.toastService.show(ToastType.Error, res.message);
      }
    });
  }
}
