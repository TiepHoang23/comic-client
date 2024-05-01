import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ComicService } from '../../../../dataSource/services/comic.service';
import { Comic } from '../../../../dataSource/schema/comic';
import { Page } from '../../../../dataSource/schema/Page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter-page.component.html',
  styleUrls: ['./chapter-page.component.scss'],
})
export class ChapterPageComponent {
  ListChapterImg: Page[]
  constructor(private comicService: ComicService, private route: ActivatedRoute) {
    this.ListChapterImg = [];
  }

  ngOnInit(): void {
    let chapterid = Number(this.route.snapshot.params['chapterid'])
    this.comicService.getChapterImgs(chapterid).subscribe((res: any) => {
      this.ListChapterImg = res.data.pages
    });
  }
}
