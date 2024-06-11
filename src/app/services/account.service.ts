import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comic } from '../dataSource/schema/comic';
import { Genre } from '../dataSource/schema/Genre';
import { HttpClient } from '@angular/common/http';
import globalConfig from '../../../GlobalConfig';
import { IServiceResponse } from '../dataSource/schema/ResponseType';
import { IUser } from '../dataSource/schema/User';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(
    private httpclient: HttpService,
  ) { }
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
  isAuthenticated(): boolean {
    return !!this.GetUser();
  }


  GetUser() {
    this.user = JSON.parse(localStorage.getItem('auth')!);
    return this.user;
  }
  GetUserInfor() {
    return this.httpclient.get(`${globalConfig.API_HOST}/User`);
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
  UpdateAvatar(avatar: FormData) {
    return this.httpclient.post(`${globalConfig.API_HOST}/User/Update/avatar`, avatar)
  }
  SaveUser(user: IUser) {
    localStorage.setItem("auth", JSON.stringify(user))
  }
  UpdateInfo(user: IUser) {
    return this.httpclient.post(`${globalConfig.API_HOST}/User/Update`, user);
  }
  UpdatePassword(updatepassword: any) {
    return this.httpclient.post(`${globalConfig.API_HOST}/User/Update/password`, updatepassword)
  }
  addTimestampToUrl(url: string): string {
    const timestamp = new Date().getTime();
    return `${url}?timestamp=${timestamp}`;
  }
}
