import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../../../../dataSource/schema/comic';
import { AdminService } from '../../../../dataSource/services/admin.service';



@Component({
  selector: 'admin-new-comic',
  templateUrl: './admin-newcomic.component.html',
  styleUrls: ['./admin-newcomic.component.scss'],
})
export class AdminNewComicComponent {
  listComics!: any[];

  constructor(private adminService: AdminService) {
    
  }
  ngOnInit(): void {
    this.adminService.GetNewComics().subscribe((res: any) => {
      this.listComics = res;
    });
  }
  onAddComicClick(comic: string) {
    this.adminService
      .AddComic(comic)
      .subscribe((res: any) =>
      {
         this.adminService.GetNewComics().subscribe((res: any) => {
           this.listComics = res;
         });
      });
  }
}
