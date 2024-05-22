import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comic } from '../../../../dataSource/schema/comic';

@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrl: './comic-card.component.scss',
})
export class ComicCardComponent {
  @Input() comic?: Comic;
  @Input() EventName?: string;
  @Output() comicHover = new EventEmitter<Comic>();
  @Output() clickEvent = new EventEmitter<Number>();

  constructor() {}

  onHoverComic(hover: boolean) {
    if (hover) {
      this.comicHover.emit(this.comic);
    } else {
      this.comicHover.emit(undefined);
    }
  }

  onClick() {
    this.clickEvent.emit(this.comic?.id);
  }
  ngOnDestroy() {
    this.comicHover.emit(undefined);
  }
}
