import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from '../../../dataSource/schema/Genre';
import { partition } from 'lodash';

@Component({
  selector: 'app-genre-catagories',
  templateUrl: './genre-catagories.component.html',
  styleUrls: ['./genre-catagories.component.scss'],
})
export class GenreCatagoriesComponent implements OnInit {
  @Input() listGenres: Array<Genre> = new Array<Genre>();
  @Input() routerLinkGenres: boolean = true;
  @Input() statusGenres: any = {};
  @Output() clickGenres: EventEmitter<any> = new EventEmitter<any>();
  catagoriesGenre: Map<string, Genre[]> = new Map();
  filteredCatagoriesGenre: Map<string, Genre[]> = new Map();
  searchTerm: string = '';

  ngOnInit(): void {
    this.updateCategories();
  }

  private updateCategories(): void {
    const [genreCountry, genreCommon] = partition(this.listGenres, (genre) =>
      ['Manga', 'Manhua', 'Manhwa'].includes(genre.title),
    );
    this.catagoriesGenre.set('countries', genreCountry);
    this.catagoriesGenre.set('genreCommon', genreCommon);

    this.filteredCatagoriesGenre = new Map(this.catagoriesGenre);
  }

  public clickGenre(id: any): void {
    this.clickGenres.emit(id);
    // console.log(this.statusGenres[genre.id]);
  }

  filterGenres(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;

    if (!this.searchTerm) {
      this.filteredCatagoriesGenre = new Map(this.catagoriesGenre);
      return;
    }

    const filtered = new Map<string, Genre[]>();

    for (const [category, genres] of this.catagoriesGenre) {
      const filteredGenres = genres.filter((genre) =>
        genre.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      if (filteredGenres.length > 0) {
        filtered.set(category, filteredGenres);
      }
    }

    this.filteredCatagoriesGenre = filtered;
  }

  // OnSearchChange(e: Event) {
  //   clearTimeout(this.typingTimer);
  //   this.typingTimer = setTimeout(() => {
  //     this.searchText = this.SearchField.nativeElement.value;
  //   }, this.doneTypingInterval);
  // }
  // searchCategories(searchText?: string): void {
  //   if (!searchText?.trim()) {
  //     // If search text is empty, reset to show all categories
  //     this.filteredCatagoriesGenre = new Map(this.catagoriesGenre);
  //     return;
  //   }

  //   this.filteredCatagoriesGenre = new Map();
  //   for (const [category, genres] of this.catagoriesGenre) {
  //     const filteredGenres = genres.filter((genre) =>
  //       genre.title.toLowerCase().includes(searchText.toLowerCase()),
  //     );
  //     if (filteredGenres.length > 0) {
  //       this.filteredCatagoriesGenre.set(category, filteredGenres);
  //     }
  //   }
  // }
}
