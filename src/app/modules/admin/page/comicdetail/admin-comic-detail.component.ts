import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../../../../dataSource/schema/comic';
import { AdminService } from '../../../../dataSource/services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-comic-detail',
  templateUrl: './admin-comic-detail.component.html',
  styleUrls: ['./admin-comic-detail.component.scss'],
})
export class AdminComicDetailComponent {
  comic!: any[];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let url = this.route.snapshot.params['slug'];
    console.log(this.route);
    this.adminService.GetComic(url).subscribe((res: any) => {
      console.log(res);
      
      if(res)
        
        this.comic = res;
    });
  }
}
