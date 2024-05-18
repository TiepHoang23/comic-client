import { Component, Input } from '@angular/core';
import { Comic } from '../../../../../dataSource/schema/comic';

@Component({
  selector: 'app-popup-detail-comic',
  templateUrl: './popup-detail-comic.component.html',
  styleUrl: './popup-detail-comic.component.scss',
})
export class PopupDetailComicComponent {
  @Input() comic?: Comic;
  constructor() {}
}
