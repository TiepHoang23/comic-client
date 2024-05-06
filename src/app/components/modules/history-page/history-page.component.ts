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
  comics!: Comic[];
  constructor(private comicService: ComicService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    console.log(localStorage);
    if (localStorage.getItem("history") === null) return

    let history = localStorage.getItem("history") as string
    let his = JSON.parse(history) as string[]
    // this.comicService.getComicsByIds(his).subscribe((res: any) => {
    //   this.comics = res.data
    // })
    console.log(his);

    this.comics = his.map((id) => ({} as Comic))
  }


  // this.comicService.getComicById(chapterid).subscribe((res: any) => {
  //   this.comic = res.data

}
