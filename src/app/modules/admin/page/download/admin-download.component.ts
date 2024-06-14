import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../../../../dataSource/schema/comic';
import { AdminService } from '@services/admin.service';




@Component({
  selector: 'admin-download',
  templateUrl: './admin-download.component.html',
  styleUrls: ['./admin-download.component.scss'],
})
export class AdminDownloadComponent {
  listComics!: any[];

  constructor(private adminService: AdminService) {

  }
  ngOnInit(): void {

  }
  loadchapters() {


    const url = (document.getElementById('orginal-comic-url') as HTMLInputElement).value;
    const host = (document.getElementById('selection-host') as HTMLSelectElement).value;
    console.log(url, host);

    this.adminService.GetChapters(host, url).subscribe((res: any) => {
      console.log(res);
    });
  }
}
