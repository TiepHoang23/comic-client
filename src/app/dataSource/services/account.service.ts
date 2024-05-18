import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comic } from '../schema/comic';
import { fetchComicService } from './mockcomic.service';
import { Genre } from '../schema/Genre';
import { HttpClient } from '@angular/common/http';
import globalConfig from '../../../../GlobalConfig';
import { IServiceResponse } from '../schema/ResponseType';
import { IUser } from '../schema/User';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  AddComment(chapterId: number, content: any, parentCommentId: number) {
    return this.httpclient.post(`${globalConfig.API_HOST}/User/Comment`, {
      chapterId,
      content,
      parentCommentId,
    });
  }
  getAuthorizationToken(): string | undefined {
    return this.GetUser()?.token;
  }
  user?: IUser
  constructor(
    private httpclient: HttpClient,
  ) { }
  isAuthenticated(): boolean {
    return !!this.GetUser();
  }


  GetUser() {
    this.user = JSON.parse(localStorage.getItem('auth')!);
    return this.user;
  }
  Follow(comicid: Number, isFollow: boolean) {
    return this.httpclient.post(`${globalConfig.API_HOST}/User/Follow?comicid=${comicid}&follow=${isFollow}`, {});
  }
  FollowedComics() {
    return this.httpclient.get(`${globalConfig.API_HOST}/User/FollowedComics`);
  }
  Login(email: string, password: string) {
    return this.httpclient.get(`${globalConfig.API_HOST}/Auth/Login?email=${email}&password=${password}`);
  }
  GetCommentsByComicId(comicId: number) {
    return this.httpclient.get(`${globalConfig.API_HOST}/User/Comments/comic/${comicId}`);
  }

  Logout() {
    localStorage.removeItem('auth');
  }
  Register(name: string, email: string, password: string) {
    return this.httpclient.post(`${globalConfig.API_HOST}/Auth/Register`, {
      name,
      email,
      password,
    });
  }
}
