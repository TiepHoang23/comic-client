import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../../../../dataSource/schema/comic';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '@services/admin.service';
import { ComicService } from '@services/comic.service';

@Component({
  selector: 'admin-comic-detail',
  templateUrl: './admin-comic-detail.component.html',
  styleUrls: ['./admin-comic-detail.component.scss'],
})
export class AdminComicDetailComponent {
  comic!: any;
  similarComics!: Comic[];
  constructor(
    private adminService: AdminService,
    private comicService: ComicService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let url = this.route.snapshot.params['slug'];
    this.adminService.GetComic(url).subscribe((res: any) => {
      if (res.status == 1) {
        this.comic = res.data;

        this.comicService
          .getDuplicateComic(this.comic.slug)
          .subscribe((res: any) => {
            this.similarComics = res.data;
            console.log(this.similarComics);
          });
      }
    });
  }
  mapingComic(slug1: string, slug2: string) {
    this.adminService.MapComic(slug1, slug2).subscribe((res: any) => {
      console.log(res);
    });

    return false;
  }

  onAddComicClick(comic: string) {
    this.adminService.AddComic(comic).subscribe((res: any) => {
      console.log(res);
    });
  }
}
