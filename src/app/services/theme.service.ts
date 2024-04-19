import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {
    const isDarkTheme = typeof window === 'undefined' ? false :
      localStorage?.getItem('isDarkTheme') === 'true';
    this.isDarkTheme.next(isDarkTheme);
  }

  setDarkTheme(isDarkTheme: boolean) {
    this.isDarkTheme.next(isDarkTheme);
    if (typeof window !== 'undefined') {
      localStorage?.setItem('isDarkTheme', this.isDarkTheme.value.toString());
    }
  }

  getDarkTheme(): Observable<boolean> {
    return this.isDarkTheme;
  }
}


