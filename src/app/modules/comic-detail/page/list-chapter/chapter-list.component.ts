import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { ComicService } from '../../../../dataSource/services/comic.service';

@Component({
  selector: 'chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrl: './chapter-list.component.scss',
})
export class ChapterListComponent {
   comicChapters!: any[];
  @Input() comic_key!: string;
  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
  ) { 

  }
  ngOnInit() {
     const id = this.route.snapshot.paramMap.get('id') || '';
      this.comicService.getChapterById(id).subscribe((res: any) => {
      let chapters=  (res.data ?? []).map((chapter:any) => {
      const [chapterTitle, chapterDescription] =
        chapter.title?.split(':') ?? [];
      // const isToDay = new Date(chapter.updateAt)..toDateString() === new Date().toDateString()
      return {
        id: chapter.id,
        chapterTitle,
        chapterDescription,
        updateAt: moment(chapter.updateAt).format('DD/MM'),
        viewCount: chapter.viewCount,
      };
    });
      
  this.comicChapters = chapters
    })
  }
}
