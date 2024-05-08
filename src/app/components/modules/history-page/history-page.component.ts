import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ComicService } from '../../../dataSource/services/comic.service';
import { ActivatedRoute } from '@angular/router';
import { Comic } from '../../../dataSource/schema/comic';
import { url } from 'inspector';

@Component({
  selector: 'history-tag',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent {
  comics: Comic[] = [];
  constructor(private comicService: ComicService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    if (localStorage.getItem("history") === null) return

    let history = localStorage.getItem("history") as string
    let his = JSON.parse(history) as Comic[]
    // this.comicService.getComicsByIds(his).subscribe((res: any) => {
    //   this.comics = res.data
    // })
    let list = []
    his.forEach((element, i) => {
      this.comicService.getComicById(element.url).subscribe((res: any) => {
        list.push(res.data)
        if (i === his.length - 1) {
          this.comics = list
        }

      })
    });
    // this.comics = his.map((id) => ({} as Comic))
  }


  // this.comicService.getComicById(chapterid).subscribe((res: any) => {
  //   this.comic = res.data

}
