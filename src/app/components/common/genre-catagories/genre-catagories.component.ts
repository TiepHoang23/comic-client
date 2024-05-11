import { Component, Input, OnInit } from '@angular/core';
import { Genre } from '../../../dataSource/schema/Genre';
import { partition } from 'lodash';

@Component({
  selector: 'app-genre-catagories',
  templateUrl: './genre-catagories.component.html',
  styleUrls: ['./genre-catagories.component.scss'],
})
export class GenreCatagoriesComponent implements OnInit {
  @Input() listGenres: Array<Genre> = new Array<Genre>();
  catagoriesGenre: Map<string, Genre[]> = new Map();
  filteredCatagoriesGenre: Map<string, Genre[]> = new Map();

  ngOnInit(): void {
    this.updateCategories();
  }

  private updateCategories(): void {
    const [genreCountry, genreCommon] = partition(this.listGenres, (genre) =>
      ['Manga', 'Manhua', 'Manhwa'].includes(genre.title),
    );
    this.catagoriesGenre.set('countries', genreCountry);
    this.catagoriesGenre.set('genreCommon', genreCommon);

    // Initialize filtered categories with the original categories
    this.filteredCatagoriesGenre = new Map(this.catagoriesGenre);
  }

  searchCategoryByTitle(title: string): Genre[] | undefined {
    for (const [category, genres] of this.catagoriesGenre) {
      if (genres.some((genre) => genre.title === title)) {
        return genres;
      }
    }
    return undefined;
  }

  // OnSearchChange(e: Event) {
  //   clearTimeout(this.typingTimer);
  //   this.typingTimer = setTimeout(() => {
  //     this.searchText = this.SearchField.nativeElement.value;
  //   }, this.doneTypingInterval);
  // }
  searchCategories(searchText?: string): void {
    if (!searchText?.trim()) {
      // If search text is empty, reset to show all categories
      this.filteredCatagoriesGenre = new Map(this.catagoriesGenre);
      return;
    }

    this.filteredCatagoriesGenre = new Map();
    for (const [category, genres] of this.catagoriesGenre) {
      const filteredGenres = genres.filter((genre) =>
        genre.title.toLowerCase().includes(searchText.toLowerCase()),
      );
      if (filteredGenres.length > 0) {
        this.filteredCatagoriesGenre.set(category, filteredGenres);
      }
    }
  }
}
