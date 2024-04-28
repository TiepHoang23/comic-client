import { Component } from '@angular/core';
import { Genre } from '../../dataSource/schema/Genre';
import { Observable } from 'rxjs';
import { ComicService } from '../../dataSource/services/comic.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  listGenre$: Observable<Array<Genre>> = this.comicService.getGenres();
  constructor(private comicService: ComicService) {}
}
