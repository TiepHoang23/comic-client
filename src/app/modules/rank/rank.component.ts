import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Comic } from '../../dataSource/schema/comic';
import { IFilters, IFilter, rankFiltersOptions } from '../../components/utils/constants';
import { Genre } from '../../dataSource/schema/Genre';
import { ComicStatus, SortType } from '../../dataSource/enum';
import { ComicService } from '@services/comic.service';



@Component({
  selector: 'rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss'],
})
export class RankComponent {
  listComics!: Comic[];

  totalpage!: number;
  totalResult!: number;
  currentPage: number = 1;
  dataView!: IFilters

  queryParams: any = {
    status: rankFiltersOptions.status[0],
    sorts: rankFiltersOptions.sorts[0],
  };
  private isOnInit = false
  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.dataView = {
      status: rankFiltersOptions.status,
      sorts: rankFiltersOptions.sorts
    }


  }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let page = Number(params['page']) || 1;
      let status = Number(params['status']) >= 0 ? Number(params['status']) : ComicStatus.ALL;
      let sort = Number(params['sort']) >= 0 ? Number(params['sort']) : SortType.TopAll
      this.currentPage = page
      this.resetQueryParams(status, sort)
      this.OnSearchComic(page, sort, status);
    });


  }
  private resetQueryParams(status: any, sort: any) {

    if (!this.isOnInit) {
      this.dataView.status.forEach(filter => {
        if (filter.value == status) this.queryParams['status'] = filter
        filter.selected = filter.value == status
      });
      this.dataView.sorts.forEach(filter => {
        if (filter.value == sort) this.queryParams['sorts'] = filter
        filter.selected = filter.value == sort
      });
      this.isOnInit = true
    }

  }

  OnSearchComic(page: number, sort: number, status: number) {
    this.listComics = [];
    this.comicService
      .getComics(page, 40, -1, sort, status)
      .subscribe((res: any) => {
        this.totalpage = res.data.totalpage;
        this.listComics = res.data.comics;
      });
  }
  OnFilterChange({ option, data }: { option: String; data: IFilter }) {
    if (data.selected) return
    const optionKey = option as keyof IFilters;

    const currentSelectedFilter = this.dataView[optionKey].find(f => f.selected);
    if (currentSelectedFilter) {
      currentSelectedFilter.selected = false;
    }
    data.selected = true
    this.queryParams[optionKey] = data

    this.router.navigate([], {
      queryParams: { page: null, status: this.queryParams['status'].value.toString(), sort: this.queryParams['sorts'].value },
      queryParamsHandling: 'merge',
      fragment: 'listComic',
    })


  }


  OnChangePage(page: number) {

    this.router.navigate([], {
      queryParams: { page: page },
      queryParamsHandling: 'merge',
      fragment: 'listComic',
    })
  }
}
