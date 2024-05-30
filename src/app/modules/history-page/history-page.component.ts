import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { url } from 'inspector';
import { Comic } from '../../dataSource/schema/comic';
import { ComicService } from '../../dataSource/services/comic.service';
import { HistoryService } from '../../services/history.service';

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
    private hisService: HistoryService
  ) {}

  ngOnInit(): void {
    let his = this.hisService.GetHistory();
    this.totalpage = Math.floor((his.length - 1) / this.comicPerPage) + 1;
    his = his.slice(
      (this.page - 1) * this.comicPerPage,
      this.page * this.comicPerPage
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
    this.ngOnInit();
  }
  onRemoveClick(id: Number) {
    this.hisService.RemoveHistory(id);
    this.comics = this.comics.filter((c) => c.id !== id);
    let totalpage =
      Math.floor((this.hisService.GetHistorySize() - 1) / this.comicPerPage) +
      1;
    if (this.totalpage != totalpage) {
      this.totalpage = totalpage;
      this.OnChangePage(this.page - 1);
    }
  }
}
