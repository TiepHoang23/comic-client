import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Comic } from '../../dataSource/schema/comic';
import { IFilters, IFilter, advancedFiltersOptions } from '../../components/utils/constants';
import { Genre } from '../../dataSource/schema/Genre';
import { ComicStatus, SortType } from '../../dataSource/enum';
import { ComicService } from '@services/comic.service';


@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {
  listComics!: Comic[];
  isLoading: boolean = true;
  totalpage!: number;
  totalResult!: number;
  currentPage: number = 1;
  dataView: IFilters = {
    status: advancedFiltersOptions.status,
    sorts: advancedFiltersOptions.sorts,

  };
  listGenres!: Genre[];
  showFilters: boolean = false;
  showFiltersOptions1: boolean = false;
  showFiltersOptions2: boolean = false;
  showFiltersOptions3: boolean = false;
  showFiltersOptions4: boolean = false;

  sortType!: SortType;
  statusType!: ComicStatus;

  filterTags: any[] = [];
  queryParams: Map<string, IFilter[]> = new Map();
  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.queryParams.set('status', advancedFiltersOptions.status);

    this.queryParams.set('sorts', advancedFiltersOptions.sorts);
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let page = Number(params['page']) || 1;
      let status = Number(params['status']) || ComicStatus.ALL;
      let sort = Number(params['sort']) >= 0 ? Number(params['sort']) : SortType.TopAll
      let genres = Number(params['genres']) || -1;
      let nogenres = Number(params['nogenres']) || -1;
      this.isLoading = true;
      this.currentPage = page
      this.OnSearchComic(page, sort, status, genres, nogenres);
    });

    this.comicService.getGenres().subscribe((genres) => {
      this.listGenres = genres;
    });
  }

  OnSearchComic(page: number, sort: number, status: number, genre: number, nogenres: number) {
    this.listComics = [];
    this.comicService
      .getComics(page, 40, genre, sort, status)
      .subscribe((res: any) => {
        this.isLoading = false;
        this.totalpage = res.data.totalpage;
        this.listComics = res.data.comics;
      });
  }
  OnFilterChange({ option, data }: { option: string; data: IFilter }) {
    const filters = this.queryParams.get(option) || [];
    const isExistingTags = filters.map((f) => f.value).includes(data.value);
    if (isExistingTags) {
      return;
    }
    this.queryParams.set(option, [...filters, data]);
    this.filterTags = Array.from(this.queryParams.values())
      .flat()
      .filter((f) => f.selected);
  }
  removeFilterTag({ option, data }: { option: string; data: IFilter }) {
    const filters = this.queryParams.get(option) || [];
    this.queryParams.set(
      option,
      filters.filter((f) => f.value !== data.value)
    );
    this.filterTags = Array.from(this.queryParams.values())
      .flat()
      .filter((f) => f.selected);
  }

  OnStatusChange(type: number) {
    this.router.navigate([], {
      queryParams: { status: type, page: 1 },
      queryParamsHandling: 'merge',
    });
  }
  OnChangePage(page: number) {

    this.router.navigate([], {
      queryParams: { page: page },
      queryParamsHandling: 'merge',
      fragment: 'listComic',
    })
  }
}
