import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../schema/comic';
import { fetchComicService } from './fetchComic.service';
import { Genre } from '../schema/Genre';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(private jsonApiService: fetchComicService) { }

  getAll(): Observable<Array<Comic>> {
    return this.jsonApiService.get('/comics');
  }

  getComicById(id: number): Observable<Comic> {
    return this.jsonApiService.get(`/comic/${id}`);
  }
  getTopComics(): Observable<Array<Comic>> {
    return this.jsonApiService.get('/top-comics');
  }

  getGenres(): Observable<Array<Genre>> {
    return this.jsonApiService.get('/genres');
  }
}
