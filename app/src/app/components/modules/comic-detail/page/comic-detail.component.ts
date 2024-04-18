import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../../../../dataSource/shema/comic';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrl: './comic-detail.component.scss',
})
export class ComicDetailComponent {
  @Input() comic!: Comic;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => {
          return data['comic'] as Comic;
        })
      )
      .subscribe((comic) => (this.comic = comic));
  }
}
