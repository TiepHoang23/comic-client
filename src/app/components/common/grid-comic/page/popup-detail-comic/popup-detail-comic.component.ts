import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Comic } from '../../../../../dataSource/schema/comic';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-popup-detail-comic',
  templateUrl: './popup-detail-comic.component.html',
  styleUrl: './popup-detail-comic.component.scss',

  animations: [
    trigger('ShowAnimation', [
      transition(':enter', [
        animate(
          200,
          keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 0.5, offset: 0.5 }),
            style({ opacity: 1, offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class PopupDetailComicComponent {
  @Input() comic: Comic = {} as Comic;
  constructor(private element: ElementRef<any>) { }
  ngOnInit() { }
  @HostListener('window:mousemove', ['$event'])
  onmousemove(event: MouseEvent) {
    if (
      event.clientY + this.element.nativeElement.offsetHeight >
      window.innerHeight
    ) {
      this.element.nativeElement.style.top =
        event.clientY - this.element.nativeElement.offsetHeight - 20 + 'px';
    } else {
      this.element.nativeElement.style.top = event.clientY + 20 + 'px';
    }
    let pos = Math.min(
      Math.max(event.clientX - 0.5 * this.element.nativeElement.offsetWidth, 0),
      window.innerWidth - this.element.nativeElement.offsetWidth
    );
    this.element.nativeElement.style.left = pos + 'px';
  }
}
