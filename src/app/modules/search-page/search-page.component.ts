import { Component } from '@angular/core';
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

  dataView!: IFilters;

  listGenres!: Genre[];

  showFilters: boolean = false;

  nowyear!: number;

  filterTags: any[] = [{ name: 324 }];
  isLoad = false;
  private isOnInit = false;
  selectOptions?: any = {
    sorts: { name: '', value: -1, isShow: false },
    status: { name: '', value: -1, isShow: false },
    year: { value: -1, isShow: false },
    genres: { value: {}, isShow: false },
    keyword: { value: "" },
  };


  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.dataView = {
      status: advancedFiltersOptions.status,
      sorts: advancedFiltersOptions.sorts
    };
    this.selectOptions.status.name = advancedFiltersOptions.status[0].name;
    this.selectOptions.sorts.name = advancedFiltersOptions.sorts[0].name;
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let page = Number(params['page']) || 1;
      let status = Number(params['status']) ? Number(params['status']) : ComicStatus.ALL;
      let sort = Number(params['sort']) >= 0 ? Number(params['sort']) : SortType.LastUpdate;
      let genres = params['genres'] || null;
      let nogenres = params['nogenres'] || null;
      let year = Number(params['year']) || -1;
      let keyword = params['keyword'] || "";
      this.currentPage = page;

      this.resetOptions(status, sort, year, genres, nogenres, keyword);

      this.OnSearchComic(page, sort, status, genres, nogenres, year, keyword);
    });

    this.comicService.getGenres().subscribe((genres) => {
      this.listGenres = genres;
    });
  }
  private resetOptions(status: any, sort: any, year: any, genres: any, nogenres: any, keyword: any) {
    if (!this.isOnInit) {


      this.selectOptions['keyword'].value = keyword;
      if (genres != null)
        for (let i of genres.split(','))
          this.selectOptions['genres'].value[i] = 1;
      if (nogenres != null)
        for (let i of nogenres.split(','))
          this.selectOptions['genres'].value[i] = 2;

      this.selectOptions['keyword'].value = keyword;
      this.selectOptions['year'].value = year;
      this.dataView.status.forEach(filter => {
        if (filter.value == status) {
          this.selectOptions['status'].name = filter.name;
          this.selectOptions['status'].value = filter.value;
          this.selectOptions['status'].isShow = false;
        }
        filter.selected = filter.value == status;
      });
      this.dataView.sorts.forEach(filter => {
        if (filter.value == sort) {
          this.selectOptions['sorts'].name = filter.name;
          this.selectOptions['sorts'].value = filter.value;
          this.selectOptions['sorts'].isShow = false;
        }
        filter.selected = filter.value == sort;
      });
      this.isOnInit = true;
    }
  }
  OnSearchComic(page: number, sort: number, status: number, genres: string, nogenres: string, year: number, keyword: string) {
    this.listComics = [];

    this.comicService
      .getAdvanceSearchComic(page, 40, sort, status, genres, nogenres, year, keyword)
      .subscribe((res: any) => {
        this.totalpage = res.data.totalpage;
        this.listComics = res.data.comics;
      });
  }
  OnFilterChange({ option, data }: { option: string; data: IFilter; }) {
    if (data.selected) return;
    this.isLoad = true;
    const optionKey = option as keyof IFilters;
    // set false các filter đã true trc đó
    const currentSelectedFilter = this.dataView[optionKey].find(f => f.selected);
    if (currentSelectedFilter) {
      currentSelectedFilter.selected = false;
    }
    data.selected = true;
    this.selectOptions[optionKey].name = data.name;
    this.selectOptions[optionKey].value = data.value;
    this.selectOptions[optionKey].isShow = false;


  }

  OnGenresChange(id: any) {
    this.isLoad = true;
    this.selectOptions.genres.value[id] = (this.selectOptions.genres.value[id] + 1 || 1) % 3;


  }
  updateGenres(): Promise<{ genres: any; nogenres: any; }> {
    return new Promise((resolve) => {
      let genres = null;
      let nogenres = null;
      if (Object.keys(this.selectOptions.genres.value).length > 0) {
        let genres = '';
        let nogenres = '';
        for (const [key, value] of Object.entries(this.selectOptions.genres.value)) {
          if (value == 1) {
            genres = genres + key.toString() + ',';
          }
          if (value == 2) {
            nogenres = nogenres + key.toString() + ',';
          }
        }
        genres = genres.slice(0, -1);
        nogenres = nogenres.slice(0, -1);
        resolve({ genres, nogenres });
      }
      else {
        resolve({ genres, nogenres });
      }
    }
    );
  }
  ClickSearch() {
    console.log(23324);
    if (this.isLoad == false) return;


    this.updateGenres().then(({ genres, nogenres }) => {
      this.isLoad = false;
      this.router.navigate([], {
        queryParams: {
          page: 1,
          status: this.selectOptions.status.value,
          sort: this.selectOptions.sorts.value,
          year: this.selectOptions.year.value,
          genres: genres,
          nogenres: nogenres,
          keyword: this.selectOptions.keyword.value
        },
        queryParamsHandling: 'merge',
        fragment: 'listComic',
      });
    });

  }

  OnChangePage(page: number) {

    this.router.navigate([], {
      queryParams: { page: page },
      queryParamsHandling: 'merge',
      fragment: 'listComic',
    });
  }
}
