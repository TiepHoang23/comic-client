import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../schema/comic';
import { fetchComicService } from './mockcomic.service';
import { Genre } from '../schema/Genre';
import { HttpClient } from '@angular/common/http';
import globalConfig from '../../../../GlobalConfig';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(
    private httpclient: HttpClient,
    private jsonApiService: fetchComicService
  ) { }

  getComics(
    page: number = 1,
    step: number = 80,
    genre: number = -1,
    sort: number = 8,
    status: number = -1
  ) {
    if (!globalConfig.USE_API) {
      return this.jsonApiService.get('/comics');
    }
    return this.httpclient.get(
      `${globalConfig.API_HOST}/comics?sort=${sort}&status=${status}&genre=${genre}&page=${page}&step=${step}`
    );
  }

  getComicById(id: number) {
    if (!globalConfig.USE_API) {
      return this.jsonApiService.get(`/comic/${id}`);
    }
    return this.httpclient.get(
      `${globalConfig.API_HOST}/comic/${id}`
    );
  }
  getChapterImgs(id: number) {
    return this.httpclient.get(
      `${globalConfig.API_HOST}/Comic/chapter/${id}`
    );
  }
  getTopComics(): Observable<Array<Comic>> {
    return this.jsonApiService.get('/top-comics');
  }

  getGenres(): Observable<Array<Genre>> {
    return this.jsonApiService.get('/genres');
  }
}
