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
  @Input() showCheckboxes: boolean = false;
  @Output() ClickEvent = new EventEmitter<number[]>();
  @Input() EventName!: string;
  hoverComic!: Comic;
  girdType: number = 0;
  selectedComics = new Set<number>();
  isSelectAll: boolean = false;

  constructor() {}

  ngOnChanges() {
    if (this.listComics && this.listComics.length === 0) {
      this.listComics = Array(this.num_preview).fill(undefined);
    }
  }

  ngOnInit(): void {
    this.listComics = Array(this.num_preview).fill(undefined);
    this.girdType = Number(localStorage.getItem('gridType')) || 0;
  }

  onHoverComic(comic: Comic) {
    this.hoverComic = comic;
  }

  ChangeGridType(target: any, type: number) {
    if (this.girdType == type) return;
    localStorage.setItem('gridType', type.toString());
    this.girdType = type;
  }

  toggleSelectComic(index: number) {
    if (this.selectedComics.has(index)) {
      this.selectedComics.delete(index);
    } else {
      this.selectedComics.add(index);
    }
  }

  selectAllComics(stage: boolean) {
    this.isSelectAll = stage;
    if (!this.isSelectAll) {
      this.selectedComics.clear();
    } else {
      this.listComics.forEach((_, index) => this.selectedComics.add(index));
    }
  }

  deleteSelectedComics() {
    if (this.selectedComics.size === 0) {
      return;
    }
    const selectedComicIds = Array.from(this.selectedComics).map(
      (index) => this.listComics[index].id,
    );
    this.ClickEvent.emit(selectedComicIds);
    this.selectedComics.clear();
  }
}
