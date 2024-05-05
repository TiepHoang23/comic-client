import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ComicService } from '../../../dataSource/services/comic.service';
import { Comic } from '../../../dataSource/schema/comic';
import { Page } from '../../../dataSource/schema/Page';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter } from '../../../dataSource/schema/Chapter';
import { ComicStatus, SortType } from '../../../dataSource/enum';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],

})
export class SearchPageComponent {
  listComics!: Comic[]
  isLoading: boolean = true;
  totalpage!: number
  dataView: any =
    {
      status: status
      , sorts: sorts
    }
  sortType!: SortType
  statusType!: ComicStatus
  constructor(private comicService: ComicService
    , private route: ActivatedRoute
    , private router: Router) {

  }


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      let page = Number(params['page']) || 1;
      let sort = Number(params['sort']) || SortType.TopAll;
      let status = Number(params['status']) || ComicStatus.ALL;
      this.isLoading = true;
      this.OnFilterChange(page, sort, status);
    })

  }

  OnFilterChange(page: number, sort: number, status: number) {
    this.comicService.getComics(page, 40, -1, sort, status).subscribe((res: any) => {
      this.isLoading = false;
      this.totalpage = res.data.totalpage

      this.listComics = res.data.comics
    });

  }
  OnSortTypeChange(type: number) {
    this.router.navigate([], { queryParams: { sort: type, page: 1 }, queryParamsHandling: 'merge' })

  }
  OnStatusChange(type: number) {
    this.router.navigate([], { queryParams: { status: type, page: 1 }, queryParamsHandling: 'merge' })
  }
}


const status = [
  {
    "Name": "Tất Cả",
    "Status": ComicStatus.ALL,

  },
  {
    "Name": "Đang Ra",
    "Status": ComicStatus.ONGOING,
  },
  {
    "Name": "Hoàn Thành",
    "Status": ComicStatus.COMPLETED,
  }
]

const sorts = [
  {
    "Name": "Mới cập nhật",
    "Type": SortType.LastUpdate,

  },
  {
    "Name": "Top All",
    "Type": SortType.TopAll,
  },
  {
    "Name": "Chapter",
    "Type": SortType.Chapter,
  },
  {
    "Name": "Theo dõi",
    "Type": SortType.TopFollow,
  },
  {
    "Name": "Bình luận",
    "Type": SortType.TopComment,
  },
  {
    "Name": "Truyện mới",
    "Type": SortType.NewComic,
  },
  {
    "Name": "Top ngày",
    "Type": SortType.TopDay,
  },
  {
    "Name": "Top tuần",
    "Type": SortType.TopWeek,
  },
  {
    "Name": "Top tháng",
    "Type": SortType.TopMonth,
  },


]