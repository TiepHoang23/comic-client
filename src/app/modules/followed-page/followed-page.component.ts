import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comic } from '../../dataSource/schema/comic';
import { ComicService } from '@services/comic.service';
import { AccountService } from '@services/account.service';
import { ToastService, ToastType } from '@services/toast.service';

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
    private toastService: ToastService,
  ) {}
  // @Output() Click: any;
  ngOnInit(): void {
    this.reqFollowComics();
  }
  reqFollowComics() {
    this.accountService.FollowedComics().subscribe((res: any) => {
      this.comics = res.data.comics;
      this.totalpage = res.data.totalpage;
      this.currentpage = res.data.Page;
    });
  }
  getInstance() {
    return this;
  }

  onUnFollowClick(id: Number[]) {
    if (id.length === 0) {
      return;
    }
    const [comicId] = id;
    const comic = this.comics.find((comic) => comic.id === comicId);

    this.accountService.Follow(comicId, false).subscribe((res: any) => {
      if (res.status === 1) {
        this.reqFollowComics();
        this.toastService.show(
          ToastType.Success,
          `Đã bỏ theo dõi ${comic!.title}`,
        );
      } else {
        this.toastService.show(ToastType.Error, res.message);
      }
    });
  }
}
