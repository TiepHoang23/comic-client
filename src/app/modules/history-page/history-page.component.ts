import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selectedComics = new Set<number>();

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

  onRemoveClickSingle(id: number) {
    this.hisService.RemoveHistory(id);
    this.updatePage();
  }

  onRemoveSelectedComics(ids: number[]) {
    ids.forEach((id) => this.hisService.RemoveHistory(id));
    this.updatePage();
  }

  updatePage() {
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

  selectAllComics() {
    this.comics.forEach((comic) => this.selectedComics.add(comic.id));
  }

  getSelectedComicsArray(): number[] {
    return Array.from(this.selectedComics);
  }
}
