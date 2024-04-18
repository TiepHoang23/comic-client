import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comic } from '../shema/comic';

@Injectable({
  providedIn: 'root',
})
export class fetchComicService {
  data: Comic[];
  constructor() {
    this.data = [
      {
        id: 1,
        thumbnail:
          'https://images.unsplash.com/photo-1520769669658-f07657f5a307?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        title: 'Visit Norway',
        description:
          'Kongeriket Norge er et nordisk, europeisk land og en selvstendig stat vest på Den skandinaviske halvøy. Geografisk sett er landet langt og smalt. På den langstrakte kysten mot Nord-Atlanteren befinner Norges vidkjente fjorder seg. Kongeriket Norge omfatter, i tillegg til fastlandet, Jan Mayen og Svalbard',
      },
      {
        id: 2,
        thumbnail:
          'https://images.unsplash.com/photo-1521109762031-b71a005c25b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
        title: 'Visit Norway',
        description:
          'Kongeriket Norge er et nordisk, europeisk land og en selvstendig stat vest på Den skandinaviske halvøy. Geografisk sett er landet langt og smalt. På den langstrakte kysten mot Nord-Atlanteren befinner Norges vidkjente fjorder seg. Kongeriket Norge omfatter, i tillegg til fastlandet, Jan Mayen og Svalbard',
      },
      {
        id: 3,
        thumbnail:
          'https://images.unsplash.com/photo-1531504060587-e6811129c0f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
        title: 'Visit Norway',
        description:
          'Kongeriket Norge er et nordisk, europeisk land og en selvstendig stat vest på Den skandinaviske halvøy. Geografisk sett er landet langt og smalt. På den langstrakte kysten mot Nord-Atlanteren befinner Norges vidkjente fjorder seg. Kongeriket Norge omfatter, i tillegg til fastlandet, Jan Mayen og Svalbard',
      },
      {
        id: 4,
        thumbnail:
          'https://images.unsplash.com/photo-1475066392170-59d55d96fe51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80',
        title: 'Visit Norway',
        description:
          'Kongeriket Norge er et nordisk, europeisk land og en selvstendig stat vest på Den skandinaviske halvøy. Geografisk sett er landet langt og smalt. På den langstrakte kysten mot Nord-Atlanteren befinner Norges vidkjente fjorder seg. Kongeriket Norge omfatter, i tillegg til fastlandet, Jan Mayen og Svalbard',
      },
      {
        id: 5,
        thumbnail:
          'https://images.unsplash.com/photo-1518124880777-cf8c82231ffb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1404&q=80',
        title: 'Visit Norway',
        description:
          'Kongeriket Norge er et nordisk, europeisk land og en selvstendig stat vest på Den skandinaviske halvøy. Geografisk sett er landet langt og smalt. På den langstrakte kysten mot Nord-Atlanteren befinner Norges vidkjente fjorder seg. Kongeriket Norge omfatter, i tillegg til fastlandet, Jan Mayen og Svalbard',
      },
    ];
  }
  get(url: string): Observable<any> {
    switch (url) {
      case '/comics':
        return of(this.data);
      default:
        const id = Number(url.substring(url.lastIndexOf('/') + 1));
        return of(this.data?.[id]);
    }
  }
}
