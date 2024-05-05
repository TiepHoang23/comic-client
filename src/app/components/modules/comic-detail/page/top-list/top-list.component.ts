import { Component, Input } from '@angular/core';
import { Comic } from '../../../../../dataSource/schema/comic';

@Component({
  selector: 'app-top-list',
  templateUrl: './top-list.component.html',
  styleUrl: './top-list.component.scss',
})
export class TopListComponent {
  @Input() listTopComics!: Comic[];
  @Input() $index = 0;
  constructor() {}
}
