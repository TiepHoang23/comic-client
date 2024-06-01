import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
// import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
// import { ChapterPageComponent } from './components/modules/chapter-page/chapter-page.component';
import { ListSearchComicComponent } from './components/nav/list-search-comic/list-search-comic.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HistoryPageComponent } from './modules/history-page/history-page.component';
import { FollowedPageComponent } from './modules/followed-page/followed-page.component';
import { AuthInterceptor } from './core/http-interceptors/auth-interceptor';
import { ToastComponent } from './components/common/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavComponent,
    FooterComponent,
    ListSearchComicComponent,
    ToastComponent,
    HistoryPageComponent,
    FollowedPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  // exports: [AppModule]
})
export class AppModule {
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {
    this.router.events
      .pipe(filter((e) => e instanceof Scroll))
      .subscribe((e: any) => {
        console.log(e);
        if (e.position) {
          // backward navigation
          viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
          viewportScroller.scrollToAnchor(e.anchor);
        } else {
          // forward navigation
          viewportScroller.scrollToPosition([0, 0]);
        }
      });
  }
}
