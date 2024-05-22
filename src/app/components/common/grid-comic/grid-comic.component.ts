import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comic } from '../../../dataSource/schema/comic';

@Component({
  selector: 'grid-comic',
  templateUrl: './grid-comic.component.html',
  styleUrls: ['./grid-comic.component.scss'],
})
export class GridComicComponent {
  @Input() num_preview: number = 40;
  @Input() listComics!: Comic[];
  @Input() _class!: string;
  @Input() _title!: string;
  @Output() ClickEvent = new EventEmitter<Number>();
  @Input() EventName!: string;
  hoverComic!: Comic;

  girdType: number = 0;

  constructor() {}
  ngOnChanges() {
    if (this.listComics && this.listComics.length === 0) {
      this.listComics = Array(this.num_preview).fill(undefined);
    }
  }

  onHoverComic(comic: Comic) {
    this.hoverComic = comic;
  }
  ngOnInit(): void {
    this.listComics = Array(this.num_preview).fill(undefined);
    this.girdType = Number(localStorage.getItem('gridType')) || 0;
  }
  ChangeGridType(target: any, type: number) {
    if (this.girdType == type) return;
    localStorage.setItem('gridType', type.toString());
    this.girdType = type;
  }
}
