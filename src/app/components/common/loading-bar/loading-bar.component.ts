import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { HttpService } from '@services/http.service';

@Component({
  selector: 'loading-bar-component',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent implements OnInit {
  public static Instance: LoadingBarComponent;
  isLoading = false;
  starting = false;
  maxtask = 0;
  @ViewChild('ProgressBar') ProgressBar!: ElementRef;
  timer: any;
  constructor(
    public loadingService: HttpService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
        this.maxtask = 0;
      }

      if (
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit() {
    // console.log(123);
  }
  ngAfterViewChecked() {
    if (this.isLoading) {
      let taskLength = this.loadingService.tasks.length;
      if (taskLength >= this.maxtask) {
        this.maxtask = taskLength;
        this.ProgressBar.nativeElement.style.width = `calc(10%)`;
      } else {
        if (taskLength + 1 > 0) {
          this.starting = true;
          let value = Math.max(
            Math.min(
              ((this.maxtask - taskLength - 1) * 100) / this.maxtask,
              30,
            ),
            70,
          );
          this.ProgressBar.nativeElement.style.width = `${value}%`;
        }
      }
      if (this.starting && this.loadingService.hasTasks() === false) {
        this.starting = false;
        this.ProgressBar.nativeElement.style.width = '100%';
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    }
  }
  ngOnChanges(change: any) {
    // console.log(this.loadingService.tasks);
  }
  startLoading() {}
}
