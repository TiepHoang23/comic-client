import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private controllers = new Map<string, Subscription>();

  constructor(private http: HttpService) { }
  private imageUrlSubject = new BehaviorSubject<string>('');
  imageUrl$ = this.imageUrlSubject.asObservable();

  updateImageUrl(url: string) {
    this.imageUrlSubject.next(url);
  }
  loadImage(url: string, onload: (res: HttpResponse<Blob>) => void) {
    this.controllers.set(
      url,
      this.http
        .get(url, {
          responseType: 'blob',
          observe: 'response',
        })
        .subscribe((res: any) => onload(res))
    );
  }

  CancelLoad(url: string) {
    if (this.controllers.has(url)) {
      this.controllers.get(url)!.unsubscribe();
      this.controllers.delete(url);
    }
  }

  CancelAll() {
    this.controllers.forEach((controller) => controller.unsubscribe());
    this.controllers.clear();
  }
}
