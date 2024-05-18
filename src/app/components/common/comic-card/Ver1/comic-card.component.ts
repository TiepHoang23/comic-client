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
  @Output() comicHover = new EventEmitter<{
    comic: Comic | undefined;
    position: { x: number; y: number };
  }>();
  @Output() clickEvent = new EventEmitter<Number>();

  constructor() { }

  onHoverComic(hover: boolean, event?: MouseEvent) {
    if (hover && event) {
      this.comicHover.emit({
        comic: this.comic,
        position: { x: event.clientX, y: event.clientY },
      });
    } else {
      this.comicHover.emit({
        comic: undefined,
        position: { x: 0, y: 0 },
      });
    }
  }

  onClick() {
    this.clickEvent.emit(this.comic?.id);
  }
}
