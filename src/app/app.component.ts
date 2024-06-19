import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Scroll } from '@angular/router';
import { filter } from 'rxjs';
import { LoadingBarComponent } from './components/common/loading-bar/loading-bar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'comic-client';

  constructor(private router: Router, private viewportScroller: ViewportScroller
  ) {
    this.router.events
      .pipe(filter((e) => e instanceof Scroll))
      .subscribe((e: any) => {
        if (e.position) {
          // backward navigation
          window.scrollTo({ top: e.position[1], left: e.position[0], behavior: "instant" })// scrollToPosition(e.position);
        } else if (e.anchor) {
          viewportScroller.scrollToAnchor(e.anchor);
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" })
        }
      });

  }

  ngOnInit(): void {

  }
}
