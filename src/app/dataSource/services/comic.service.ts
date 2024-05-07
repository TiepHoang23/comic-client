import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comic } from '../schema/comic';
import { fetchComicService } from './mockcomic.service';
import { Genre } from '../schema/Genre';
import { HttpClient } from '@angular/common/http';
import globalConfig from '../../../../GlobalConfig';
import { IServiceResponse } from '../schema/ResponseType';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(
    private httpclient: HttpClient,
    private jsonApiService: fetchComicService,
  ) {}

  getComics(
    page: number = 1,
    step: number = 40,
    genre: number = -1,
    sort: number = 8,
    status: number = -1,
  ): Observable<IServiceResponse<{ comics: Comic[] }>> {
    if (!globalConfig.USE_API) {
      return this.jsonApiService.get('/comics');
    }
    const params = {
      page: page.toString(),
      step: step.toString(),
      genre: genre.toString(),
      sort: sort.toString(),
      status: status.toString(),
    };
    const searchParams = new URLSearchParams(params).toString();
    return this.httpclient.get(
      `${globalConfig.API_HOST}/comics?${searchParams}`,
    ) as Observable<IServiceResponse<{ comics: Comic[] }>>;
  }

  getComicById(id: string): Observable<IServiceResponse<Comic>> {
    if (!globalConfig.USE_API) {
      return this.jsonApiService.get(`/comic/${id}`);
    }

    return this.httpclient.get(
      `${globalConfig.API_HOST}/comic/${id}`,
    ) as Observable<IServiceResponse<Comic>>;
  }
  getChapterImgs(id: number) {
    return this.httpclient.get(`${globalConfig.API_HOST}/Comic/chapter/${id}`);
  }
  getChapterById(id: string) {
    return this.httpclient.get(`${globalConfig.API_HOST}/Comic/${id}/chapters`);
  }
  getTopComics(): Observable<IServiceResponse<{ comics: Comic[] }>> {
    if (!globalConfig.USE_API) {
      return this.jsonApiService.get('/top-comics');
    }
    const params = {
      page: '1',
      step: '5',
      genre: '-1',
      sort: '8',
      status: '-1',
    };
    const searchParams = new URLSearchParams(params).toString();
    return this.httpclient.get(
      `${globalConfig.API_HOST}/comics?${searchParams}`,
    ) as Observable<IServiceResponse<{ comics: Comic[] }>>;
  }
  getSearchComic(key: string) {
    return this.httpclient.get(
      `${globalConfig.API_HOST}/api/search?keyword=${key}`,
    );
  }

  getGenres(): Observable<Array<Genre>> {
    return this.jsonApiService.get('/genres');
  }
}
