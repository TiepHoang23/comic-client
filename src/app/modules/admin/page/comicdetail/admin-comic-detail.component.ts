import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../../../../dataSource/schema/comic';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '@services/admin.service';
import { ComicService } from '@services/comic.service';
import { ToastService, ToastType } from '@services/toast.service';

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
    private route: ActivatedRoute,
    private router: Router,
    public toastService: ToastService
  ) { }
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
      this.toastService.show(ToastType.Success, res.msg);
      this.router.navigate(['/admin']);
    });

    return false;
  }

  onAddComicClick(comic: string) {
    this.adminService.AddComic(comic).subscribe((res: any) => {
      console.log(res);
    });
  }
}
