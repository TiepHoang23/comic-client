import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { url } from 'inspector';
import { Comic } from '../../dataSource/schema/comic';
import { HistoryService } from '@services/history.service';
import { ComicService } from '@services/comic.service';

@Component({
  selector: 'history-tag',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent {
  comics: Comic[] = [];
  page: number = 1;
  totalpage: number = 1;
  comicPerPage = 12;
  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private hisService: HistoryService,
  ) {}

  ngOnInit(): void {
    this.RefeshPage();
  }
  RefeshPage() {
    let his = this.hisService.GetHistory();
    this.totalpage = Math.floor((his.length - 1) / this.comicPerPage) + 1;
    his = his.slice(
      (this.page - 1) * this.comicPerPage,
      this.page * this.comicPerPage,
    );
    let list = [];
    his.forEach((element, i) => {
      this.comicService.getComicById(element.url).subscribe((res: any) => {
        list.push(res.data);
        if (i === his.length - 1) {
          this.comics = list;
        }
      });
    });
  }
  OnChangePage(page: number) {
    this.page = page;
    this.RefeshPage();
  }
  onRemoveClick(id: Number) {
    this.hisService.RemoveHistory(id);
    let totalpage =
      Math.floor((this.hisService.GetHistorySize() - 1) / this.comicPerPage) +
      1;

    if (this.totalpage != totalpage && this.page === this.totalpage) {
      this.totalpage = totalpage;
      this.OnChangePage(this.page - 1);
    } else {
      this.OnChangePage(this.page);
    }
  }
}
