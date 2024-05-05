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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ChapterPageComponent } from './components/modules/chapter-page/chapter-page.component';
import { ListSearchComicComponent } from './components/nav/list-search-comic/list-search-comic.component';
import { SearchPageComponent } from './components/modules/search-page/search-page.component';
import { PaginationComponent } from './components/common/Pagination/pagination.component';
import { HomePageModule } from './components/modules/home-page/home-page.module';
import { HomePageComponent } from './components/modules/home-page/page/home-page.component';
import { ComicDetailComponent } from './components/modules/comic-detail/page/layout/comic-detail.component';
import { ComicCardComponent } from './components/modules/comic-card/comic-card.component';
import { TopListComponent } from './components/modules/comic-detail/page/top-list/top-list.component';
import { CarouselLandingComponent } from './components/modules/carousel-landing/carousel-landing.component';
import { CarouselLayoutComponent } from './components/modules/carousel-landing/page/carousel-layout/carousel-layout.component';
import { ListCardSkeletonComponent } from './components/modules/home-page/page/list-card-skeleton/list-card-skeleton/list-card-skeleton.component';
import { NumeralPipe } from './pines/numeral.pipe';

// import { NumeralPipe } from './pines/numeral.pipe';
// import { PageComponent } from './app/components/modules/comic-detail/page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavComponent,
    FooterComponent,
    ChapterPageComponent,
    ListSearchComicComponent,
    SearchPageComponent,
    HomePageComponent,
    ComicCardComponent,
    ComicDetailComponent,
    TopListComponent,
    CarouselLandingComponent,
    CarouselLayoutComponent,
    ListCardSkeletonComponent,
    PaginationComponent
    // PageComponent,
    // NumeralPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [provideClientHydration(), provideHttpClient()],
  bootstrap: [AppComponent],
  // exports: [AppModule]
})
export class AppModule { }
