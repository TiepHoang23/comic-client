import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comic } from '../dataSource/schema/comic';
import { Genre } from '../dataSource/schema/Genre';
import { HttpClient } from '@angular/common/http';
import globalConfig from '../../../GlobalConfig';
import { IServiceResponse } from '../dataSource/schema/ResponseType';
import { IUser } from '../dataSource/schema/User';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpclient: HttpClient) { }

  GetNewComics() {
    return this.httpclient.get(`${globalConfig.ADMIN_HOST}/newcomics`);
  }
  AddComic(comic: string) {
    return this.httpclient.get(`${globalConfig.ADMIN_HOST}/add-comic/${comic}`);
  }
  GetComic(id: string) {
    return this.httpclient.get(`${globalConfig.ADMIN_HOST}/newcomic/${id}`);
  }
  GetChapters(host: string, url: string) {

    return this.httpclient.get(`${globalConfig.ADMIN_HOST}/getchapters?host=${host}&url=${url}`);
  }

  MapComic(slug1: string, slug2: string) {

    return this.httpclient.post(`${globalConfig.ADMIN_HOST}/mapcomic`,
      {
        slug1,
        slug2
      }
    );

  }
}
