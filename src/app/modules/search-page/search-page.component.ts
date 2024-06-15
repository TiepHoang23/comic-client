import { Component, OnInit } from '@angular/core';
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
export class SearchPageComponent implements OnInit {
  listComics: Comic[] = [];
  totalpage!: number;
  totalResult!: number;
  currentPage: number = 1;
  dataView: IFilters;
  listGenres: Genre[] = [];
  showFilters: boolean = false;
  nowyear!: number;
  isLoad = false;
  private isOnInit = false;
  filterTags: any[] = [];

  lastupdate!: SortType.LastUpdate;

  selectOptions: any = {
    sorts: { value: -1, name: '', isShow: false },
    status: { value: -1, name: '', isShow: false },
    year: { value: 0, name: '', isShow: false },
    genres: { value: {}, name: {}, isShow: false },
    keyword: { value: '', name: '' },
  };

  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dataView = {
      status: advancedFiltersOptions.status,
      sorts: advancedFiltersOptions.sorts,
    };
    this.selectOptions.status.name = advancedFiltersOptions.status[0].name;
    this.selectOptions.sorts.name = advancedFiltersOptions.sorts[0].name;
    this.lastupdate = SortType.LastUpdate;
    console.log(this.lastupdate);

  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  ngOnInit(): void {
    this.comicService.getGenres().subscribe((genres) => {
      this.listGenres = genres;
    });
    this.route.queryParams.subscribe((params) => {
      const page = +params['page'] || 1;
      const status = +params['status'] || ComicStatus.ALL;
      const sort = +params['sort'] >= 0 ? +params['sort'] : SortType.LastUpdate;
      const genres = params['genres'] || '';
      const nogenres = params['nogenres'] || '';
      const year = +params['year'] || 0;
      const keyword = params['keyword'] || '';
      this.currentPage = page;

      this.resetOptions(status, sort, year, genres, nogenres, keyword);
      this.searchComics(page, sort, status, genres, nogenres, year, keyword);
    });

  }
  getGenreKeys() {
    return Object.keys(this.selectOptions.genres.value)
      .filter(key => this.selectOptions.genres.value[key] > 0);
  }
  private resetOptions(status: number, sort: number, year: number, genres: string, nogenres: string, keyword: string) {
    if (this.isOnInit) return;

    this.selectOptions.keyword.value = keyword;

    genres.split(',').filter(x => x != '').forEach((id) => {
      this.selectOptions.genres.value[id] = 1
      this.selectOptions.genres.name[id] = this.listGenres.find(x => x.id == parseInt(id))?.title
    })
    nogenres.split(',').filter(x => x != '').forEach((id) => {
      this.selectOptions.genres.value[id] = 2
      this.selectOptions.genres.name[id] = this.listGenres.find(x => x.id == parseInt(id))?.title
    }
    );

    this.selectOptions.year.value = year;
    this.selectOptions.year.name = year.toString()

    this.dataView.status.forEach(filter => {
      filter.selected = filter.value === status;
      if (filter.selected) {
        this.selectOptions.status.name = filter.name;
        this.selectOptions.status.value = filter.value;
      }
    });

    this.dataView.sorts.forEach(filter => {
      filter.selected = filter.value === sort;
      if (filter.selected) {
        this.selectOptions.sorts.name = filter.name;
        this.selectOptions.sorts.value = filter.value;
      }
    });

    this.isOnInit = true;
  }

  private searchComics(page: number, sort: number, status: number, genres: string, nogenres: string, year: number, keyword: string) {
    this.listComics = [];
    this.comicService.getAdvanceSearchComic(page, 40, sort, status, genres, nogenres, year, keyword).subscribe((res: any) => {
      this.totalpage = res.data.totalpage;
      this.listComics = res.data.comics;
    });
  }

  OnFilterChange({ option, data }: { option: string; data: IFilter }) {
    if (data.selected) return;

    this.isLoad = true;
    this.dataView[option as keyof IFilters].forEach(filter => filter.selected = false);
    data.selected = true;

    this.selectOptions[option as keyof IFilters].name = data.name;
    this.selectOptions[option as keyof IFilters].value = data.value;
    this.selectOptions[option as keyof IFilters].isShow = false;



  }
  OnYearChange(year: number) {
    this.isLoad = true;
    this.selectOptions.genres.isShow = false;
    this.selectOptions.sorts.isShow = false;
    this.selectOptions.status.isShow = false;
    this.selectOptions.year.value = this.selectOptions.year.value + year
    this.selectOptions.year.name = year.toString()
  }
  OnGenresChange(genre: Genre) {
    this.isLoad = true;
    const genreValue = this.selectOptions.genres.value[genre.id];
    this.selectOptions.genres.value[genre.id] = (genreValue + 1 || 1) % 3;
    this.selectOptions.genres.name[genre.id] = genre.title;
  }

  private updateGenres(): Promise<{ genres: string; nogenres: string }> {
    return new Promise((resolve) => {
      const genres: string[] = [];
      const nogenres: string[] = [];

      Object.entries(this.selectOptions.genres.value).forEach(([key, value]) => {
        if (value === 1) genres.push(key);
        if (value === 2) nogenres.push(key);
      });

      resolve({
        genres: genres.join(','),
        nogenres: nogenres.join(','),
      });
    });
  }

  ClickSearch() {
    if (!this.isLoad) return;

    this.updateGenres().then(({ genres, nogenres }) => {
      this.isLoad = false;
      this.router.navigate([], {
        queryParams: {
          page: 1,
          status: this.selectOptions.status.value,
          sort: this.selectOptions.sorts.value,
          year: this.selectOptions.year.value,
          genres,
          nogenres,
          keyword: this.selectOptions.keyword.value,
        },
        queryParamsHandling: 'merge',
        fragment: 'listComic',
      });
    });
  }

  RemoveFilterTag({ option, data }: { option: string; data: any }) {
    this.isLoad = true;
    switch (option) {
      case 'status':
        this.selectOptions.status.value = -1;
        this.selectOptions.status.name = this.dataView.status[0].name;
        break;
      case 'sort':
        this.selectOptions.sorts.value = this.lastupdate;
        this.selectOptions.sorts.name = this.dataView.sorts[0].name
        break;
      case 'year':
        this.selectOptions.year.value = 0;
        break;
      case 'genres':
        this.selectOptions.genres.value[data] = 0;
        break;

    }
  }

  OnChangePage(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
      fragment: 'listComic',
    });
  }
}
