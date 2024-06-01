import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Comic } from '../dataSource/schema/comic';
import lodash from 'lodash';
import { Chapter } from '../dataSource/schema/Chapter';
@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  listHistory: Comic[] = [];
  constructor() {
    if (localStorage.getItem('history') === null) {
      localStorage.setItem('history', JSON.stringify([]));
    }

    this.listHistory = JSON.parse(localStorage.getItem('history') as string);
  }

  SaveHistory(comic: Comic, chapter?: Chapter) {
    comic = lodash.cloneDeep(comic);
    comic.chapters = [];
    let oldcomic = this.listHistory.find((c) => c.id == comic.id);
    if (oldcomic) {
      if (chapter) {
        if (!oldcomic.chapters) oldcomic.chapters = [];

        if (oldcomic.chapters.some((c) => c.id == chapter.id)) return;

        oldcomic.chapters.push(chapter);
      }
    } else {
      this.listHistory.unshift(comic);
      if (chapter) {
        comic.chapters = [chapter];
      }
    }
    save_history: localStorage.setItem(
      'history',
      JSON.stringify(this.listHistory),
    );
    if (localStorage.getItem('history') === null) {
      localStorage.setItem('history', JSON.stringify([comic]));
      return;
    }
  }

  GetHistory(): Comic[] {
    return this.listHistory;
  }
  GetHistorySize(): number {
    return this.listHistory.length;
  }

  RemoveHistory(id: Number) {
    this.listHistory = this.listHistory.filter((c) => c.id != id);
    localStorage.setItem('history', JSON.stringify(this.listHistory));
  }
}
