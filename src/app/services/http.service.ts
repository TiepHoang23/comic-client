// src/app/toast.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingBarComponent } from '../components/common/loading-bar/loading-bar.component';
import { NavigationStart, Router } from '@angular/router';
import { forEach } from 'lodash';

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}
interface Toast {
  id: number;
  type: ToastType
  message: string;
  state: 'enter' | 'leave'; // Add state property
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public tasks: Array<Observable<Object>> = [];

  constructor(private httpclient: HttpClient,private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
       this.ClearAll();
      }
    });
  }
  
  get(url: string, options = {}) {
    let task = this.httpclient.get(url, options);
    this.TaskAdd(task);
    return task;
  }
  TaskAdd(task : Observable<Object>) {
    this.tasks.push(task);
    task.subscribe({
      error: (e) => () => {
        this.tasks = this.tasks.filter((t: any) => t !== task);
      },
      complete: () => {
        this.tasks = this.tasks.filter((t: any) => t !== task);
      },
    });
  }
  ClearAll() {
    this.tasks = [];
  }

  TaskRemove(task : Observable<Object>) {
    this.tasks = this.tasks.filter((t: any) => t !== task);
  }
 
  hasTasks = () => this.tasks.length > 0;
  post(url: string, body: any) {
    return this.httpclient.post(url, body);
  }

  put(url: string, body: any) {
    return this.httpclient.put(url, body);
  }

  delete(url: string) {
    return this.httpclient.delete(url);
  }
}
