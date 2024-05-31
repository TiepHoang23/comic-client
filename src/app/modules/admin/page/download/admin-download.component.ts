import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../../../../dataSource/schema/comic';
import { AdminService } from '../../../../dataSource/services/admin.service';



@Component({
  selector: 'admin-download',
  templateUrl: './admin-download.component.html',
  styleUrls: ['./admin-download.component.scss'],
})
export class AdminNewComicComponent {
  listComics!: any[];

  constructor(private adminService: AdminService) {

  }
  ngOnInit(): void {

  }

}
