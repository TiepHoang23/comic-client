import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comic } from '../schema/comic';
import { fetchComicService } from './mockcomic.service';
import { Genre } from '../schema/Genre';
import { HttpClient } from '@angular/common/http';
import globalConfig from '../../../../GlobalConfig';
import { IServiceResponse } from '../schema/ResponseType';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(
    private httpclient: HttpClient,
    private jsonApiService: fetchComicService,
  ) { }

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
      page: _.random(1, 200).toString(),
      step: step.toString(),
      genre: '-1',
      sort: sort.toString(),
      status: '-1',
    };
    // const params = {
    //   page: page.toString(),
    //   step: step.toString(),
    //   genre: genre.toString(),
    //   sort: sort.toString(),
    //   status: status.toString(),
    // };
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
  getTopComics({
    top = 10,
  }): Observable<IServiceResponse<{ comics: Comic[] }>> {
    if (!globalConfig.USE_API) {
      return this.jsonApiService.get('/top-comics');
    }
    const params = {
      page: _.random(1, 100).toString(),
      step: top.toString(),
      genre: '-1',
      sort: _.random(1, 8).toString(),
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
