import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../../../../dataSource/schema/comic';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrl: './comic-detail.component.scss',
})
export class ComicDetailComponent  implements OnInit {
   comic!: Comic;

  constructor(private route: ActivatedRoute) {
    // console.log(this.route.data);
    this.route.data.subscribe((data) => console.log(data));
  }

  ngOnInit(): void {
    console.log(this.route.data);
    this.route.data.pipe(map((data) => data['comic'])).subscribe((comic) => (this.comic = comic));
  }
}
