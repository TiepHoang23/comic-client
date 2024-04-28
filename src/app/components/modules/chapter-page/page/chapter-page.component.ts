import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ComicService } from '../../../../dataSource/services/comic.service';
import { Comic } from '../../../../dataSource/schema/comic';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter-page.component.html',
  styleUrls: ['./chapter-page.component.scss'],
})
export class ChapterPageComponent {
  listComics$: Observable<Comic[]> = this.comicService.getAll();
  constructor(private comicService: ComicService) {}
}
