import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Comic } from '../../dataSource/schema/comic';
import { IFilters, IFilter, rankFiltersOptions } from '../../components/utils/constants';
import { Genre } from '../../dataSource/schema/Genre';
import { ComicStatus, SortType } from '../../dataSource/enum';
import { ComicService } from '@services/comic.service';
import { cloneDeep } from 'lodash';


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
  initialFilters: IFilters = JSON.parse(JSON.stringify(rankFiltersOptions))
  queryParams: Map<string, IFilter[]> = new Map();
  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.dataView = {
      status: this.initialFilters.status,
      sorts: this.initialFilters.sorts
    }

    this.queryParams.set('status', [this.initialFilters.status[0]]);
    this.queryParams.set('sorts', [this.initialFilters.status[0]]);
  }


  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      let page = Number(params['page']) || 1;
      let status = Number(params['status']) || ComicStatus.ALL;
      let sort = Number(params['sort']) >= 0 ? Number(params['sort']) : SortType.TopAll

      this.currentPage = page
      console.log(status, sort);
      this.OnSearchComic(page, sort, status);
    });


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
    // set false các filter đã true trc đó
    const currentSelectedFilter = this.dataView[optionKey].find(f => f.selected);
    if (currentSelectedFilter) {
      currentSelectedFilter.selected = false;
    }
    data.selected = true

    this.queryParams.set(optionKey, [data]);
    const filterTags = Array.from(this.queryParams.values()).flat()


    this.router.navigate([], {
      queryParams: { page: null, status: filterTags[0].value, sort: filterTags[1].value },
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
