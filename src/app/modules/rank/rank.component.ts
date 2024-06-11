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


  queryParams: Map<string, IFilter[]> = new Map();
  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    const selectedStatus = rankFiltersOptions.status.find((f: any) => f.selected == true);
    this.queryParams.set('status', selectedStatus ? [selectedStatus] : []);
    const selectedSorts = rankFiltersOptions.sorts.find((f: any) => f.selected == true);
    this.queryParams.set('sorts', selectedSorts ? [selectedSorts] : []);
  }


  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      let page = Number(params['page']) || 1;
      let status = Number(params['status']) || ComicStatus.ALL;
      let sort = Number(params['sort']) || SortType.TopAll
      this.isLoading = true;
      this.currentPage = page
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
    // set false các filter đã true trc đó
    const currentSelectedFilter = this.dataView[optionKey].find(f => f.selected);
    if (currentSelectedFilter) {
      currentSelectedFilter.selected = false;
    }
    data.selected = true

    this.queryParams.set(optionKey, [data]);


    const filterTags = Array.from(this.queryParams.values()).flat()

    this.router.navigate([], {
      queryParams: { status: filterTags[0].value, sort: filterTags[1].value },
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
