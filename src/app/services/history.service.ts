import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Comic } from '../dataSource/schema/comic';

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

  SaveHistory(comic: Comic) {

    if (this.listHistory.find((c) => c.id == comic.id)) return;
    this.listHistory.unshift(comic);
    localStorage.setItem('history', JSON.stringify(this.listHistory));
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


