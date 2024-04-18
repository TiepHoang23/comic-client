import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ComicService } from '../../../../dataSource/services/comic.service';
import { Comic } from '../../../../dataSource/shema/comic';

@Component({
  selector: 'app-home',

  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  listComics$: Observable<Comic[]> = this.comicService.getAll();
  constructor(private comicService: ComicService) {}
}
