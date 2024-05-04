import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ComicService } from '../../../dataSource/services/comic.service';
import { Comic } from '../../../dataSource/schema/comic';
import { Page } from '../../../dataSource/schema/Page';
import { ActivatedRoute } from '@angular/router';
import { Chapter } from '../../../dataSource/schema/Chapter';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {


  
  constructor(private comicService: ComicService, private route: ActivatedRoute) {
   
  }

  ngOnInit(): void {

}
  
}
