import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private controllers = new Map<string, AbortController>();

  constructor(private http: HttpClient) {}

  loadImage(url: string) {
    const controller = new AbortController();
    this.controllers.set(url, controller);
    let data: any = {
      responseType: 'blob',
      signal: controller.signal,
    };
    return this.http.get(url, data);
  }

  abortImageLoad(url: string) {
    const controller = this.controllers.get(url);
    console.log('aborting', controller);

    if (controller) {
      controller.abort();
      this.controllers.delete(url);
    }
  }

  clearAll() {
    this.controllers.forEach((controller) => controller.abort());
    this.controllers.clear();
  }
}
