import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { OverlayContainer } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';

import { Comic } from '../../../dataSource/schema/comic';
import { HistoryService } from '@services/history.service';

@Component({
  selector: 'recent-read-component',
  templateUrl: './recent-read.component.html',
  styleUrls: ['./recent-read.component.scss'],
})
export class RecentReadComponent implements OnInit {
  listComics: Comic[] = [];
  constructor(
    private route: ActivatedRoute,

    private hisService: HistoryService,
  ) {}
  ngOnInit(): void {
    this.listComics = this.hisService.GetHistory().slice(0, 5) ?? [];
  }
  ngOnChanges() {}
}
