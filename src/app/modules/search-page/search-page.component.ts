import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  totalpage!: number;
  totalResult!: number;
  currentPage: number = 1;

  initialFilters: IFilters = JSON.parse(JSON.stringify(advancedFiltersOptions))
  dataView!: IFilters

  listGenres!: Genre[];

  showFilters: boolean = false;

  nowyear!: number;

  filterTags: any[] = [];

  selectOptions?: any = {
    sorts: { name: '', value: -1, isShow: false },
    status: { name: '', value: -1, isShow: false },
    year: { value: -1, isShow: false },
    genres: { value: {}, isShow: false },
  }


  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.selectOptions.year.value = new Date().getFullYear();

    this.dataView = {
      status: this.initialFilters.status,
      sorts: this.initialFilters.sorts
    }
    this.selectOptions.status.name = advancedFiltersOptions.status[0].name
    this.selectOptions.sorts.name = advancedFiltersOptions.sorts[0].name
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
      let year = Number(params['year']) || -1;
      this.currentPage = page
      this.OnSearchComic(page, sort, status, genres, nogenres, year);
    });

    this.comicService.getGenres().subscribe((genres) => {
      this.listGenres = genres;
    });
  }

  OnSearchComic(page: number, sort: number, status: number, genre: number, nogenres: number, year: number) {
    this.listComics = [];

    this.comicService
      .getComics(page, 40, genre, sort, status)
      .subscribe((res: any) => {

        this.totalpage = res.data.totalpage;
        this.listComics = res.data.comics;
      });
  }
  OnFilterChange({ option, data }: { option: string; data: IFilter }) {
    if (data.selected) return
    const optionKey = option as keyof IFilters;
    // set false các filter đã true trc đó
    const currentSelectedFilter = this.dataView[optionKey].find(f => f.selected);
    if (currentSelectedFilter) {
      currentSelectedFilter.selected = false;
    }
    data.selected = true
    this.selectOptions[optionKey].name = data.name
    this.selectOptions[optionKey].value = data.value
    this.selectOptions[optionKey].isShow = false


  }

  OnGenresChange(id: any) {
    console.log(id);

    this.selectOptions.genres.value[id] = (this.selectOptions.genres.value[id] + 1 || 1) % 3;
    console.log(this.selectOptions.genres.value);
  }



  OnChangePage(page: number) {

    this.router.navigate([], {
      queryParams: { page: page },
      queryParamsHandling: 'merge',
      fragment: 'listComic',
    })
  }
}
