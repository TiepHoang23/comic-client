import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { OverlayContainer } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';

import { Comic } from '../../../dataSource/schema/comic';
import { HistoryService } from '@services/history.service';
import { LoadingService } from '@services/loading.service';

@Component({
  selector: 'loading-bar-component',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent implements OnInit {
  // public static Instance: LoadingBarComponent;
  isLoading = false;

  constructor(
    public loadingService: LoadingService
  ) {

  }
  ngOnInit(): void {

  }

}
