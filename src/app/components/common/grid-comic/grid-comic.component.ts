import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
  input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ComicService } from '../../../dataSource/services/comic.service';
import { Comic } from '../../../dataSource/schema/comic';
import { ActivatedRoute, Router } from '@angular/router';

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
  girdType: number = 0;
  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  ngOnChanges(changes: any) {
    if (this.listComics && this.listComics.length === 0) {
      this.listComics = Array(this.num_preview).fill(undefined);
    }
  }

  ngOnInit(): void {
    this.listComics = Array(this.num_preview).fill(undefined);
  }
  ChangeGridType(target: any, type: number) {
    this.girdType = type;
    target.classList.toggle('active');

    var sibling = target.nextSibling;
    sibling.classList.toggle('active');
  }
}
