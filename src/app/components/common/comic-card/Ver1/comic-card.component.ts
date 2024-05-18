import { Component, Input } from '@angular/core';
import { Comic } from '../../../../dataSource/schema/comic';

@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrl: './comic-card.component.scss'
})
export class ComicCardComponent {
  @Input() comic?: Comic;
  @Input() EventName?: string;
  @Input() ClickEvent?: any
  constructor() { }
  ngOnInit(): void {
    // console.log(this.comic);
  }
  onClick() {

    this.ClickEvent(this.comic);

  }

}
