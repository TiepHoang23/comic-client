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
  user: IUser | null = null;
  constructor(
    private httpclient: HttpClient,
  ) { }

  GetUser() {
    this.user = JSON.parse(localStorage.getItem('auth') || '');

    return this.user;
  }

  Login(email: string, password: string) {
    return this.httpclient.get(`${globalConfig.API_HOST}/Auth/Login?email=${email}&password=${password}`);
  }
  Logout() {
    localStorage.removeItem('auth');
  }
}
