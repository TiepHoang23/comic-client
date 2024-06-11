import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Comic } from '../../dataSource/schema/comic';
import { IRankFilters, IFilter, rankFiltersOptions } from '../../components/utils/constants';
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
  isLoading: boolean = true;
  totalpage!: number;
  totalResult!: number;
  currentPage: number = 1;
  dataView: IRankFilters = {
    status: rankFiltersOptions.status,
    sorts: rankFiltersOptions.sorts,
  };



  sortType!: SortType;
  statusType!: ComicStatus;

  filterTags: any[] = [];
  queryParams: Map<string, IFilter[]> = new Map();
  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.queryParams.set('status', rankFiltersOptions.status);

    this.queryParams.set('sorts', rankFiltersOptions.sorts);
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let page = Number(params['page']) || 1;
      let status = Number(params['status']) || ComicStatus.ALL;
      let sort = Number(params['sort']) || SortType.TopAll
      this.isLoading = true;
      this.OnSearchComic(page, sort, status);

    });


  }

  OnSearchComic(page: number, sort: number, status: number) {
    this.listComics = [];
    this.comicService
      .getComics(page, 40, -1, sort, status)
      .subscribe((res: any) => {
        this.isLoading = false;
        this.totalpage = res.data.totalpage;
        this.listComics = res.data.comics;
      });
  }
  OnFilterChange({ option, data }: { option: String; data: IFilter }) {
    if (data.selected) return

    const optionKey = option as keyof IRankFilters;

    const currentSelectedFilter = this.dataView[optionKey].find(f => f.selected);
    if (currentSelectedFilter) {
      currentSelectedFilter.selected = false;
    }
    data.selected = true

    const filters = this.queryParams.get(optionKey) || [];


    this.queryParams.set(optionKey, [...filters, data]);
    this.filterTags = Array.from(this.queryParams.values())
      .flat()
      .filter((f) => f.selected);

    console.log(this.filterTags);
  }


  OnChangePage(page: number) {

    this.router.navigate([], {
      queryParams: { page: page },
      queryParamsHandling: 'merge',
      fragment: 'listComic',
    })
  }
}
