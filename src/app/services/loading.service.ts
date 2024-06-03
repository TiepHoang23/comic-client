// src/app/toast.service.ts
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  isLoading = false;

  constructor() { }

  start() {
    this.isLoading = true;
  }
  stop() {
    setTimeout(() => this.isLoading = false, 750);
  }
}
