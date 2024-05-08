import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { OverlayContainer } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';
import { ComicService } from '../../../dataSource/services/comic.service';
import { Comic } from '../../../dataSource/schema/comic';



@Component({
  selector: 'recent-read-component',
  templateUrl: './recent-read.component.html',
  styleUrls: ['./recent-read.component.scss'],
})
export class RecentReadComponent implements OnInit {

  listComics: Comic[] = [];
  constructor(
    private route: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {

    if (localStorage.getItem("history") === null) return

    let history = localStorage.getItem("history") as string
    this.listComics = JSON.parse(history) as Comic[]

  }
  ngOnChanges() {

  }

}

