import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ComicService } from '../../../dataSource/services/comic.service';
import { Comic } from '../../../dataSource/schema/comic';
import { Page } from '../../../dataSource/schema/Page';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter } from '../../../dataSource/schema/Chapter';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter-page.component.html',
  styleUrls: ['./chapter-page.component.scss'],
})
export class ChapterPageComponent {
  ListChapterImg: Page[];
  comic!: Comic;
  mainChapter!: Chapter;
  

  @ViewChild('MenuNavigation') SearchField!: ElementRef;
  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ListChapterImg = [];
  }

  ngOnInit(): void {
    // let chapterid = Number(this.route.snapshot.params['chapterid']);
    this.route.params.subscribe((params) => {
      let chapterid = Number(params['chapterid']);
      this.comicService.getChapterImgs(chapterid).subscribe((res: any) => {
        this.ListChapterImg = res.data.pages;
        this.comic = res.data.comic;
        this.mainChapter = res.data;
      });
    })
  }
  ngOnChanges(): void {
    
  }
  ToggleMenu(isToggle: boolean) {
    if (isToggle) {
      this.SearchField.nativeElement.classList.toggle('translate-x-full');
    } else {
      this.SearchField.nativeElement.classList.add('translate-x-full');
    }
  }
  onChangeChapter(event : any) {
    this.OnChangeChapter(event.target.value);
  }
  OnChangeChapter(chapterid: number) {
    this.router.navigate(['truyen-tranh',this.comic.url,'chapter', chapterid]);
  }
}
