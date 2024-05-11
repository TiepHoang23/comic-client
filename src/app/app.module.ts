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
import { PaginationComponent } from './components/common/pagination/pagination.component';
import { HomePageComponent } from './components/modules/home-page/home-page.component';
import { ComicDetailComponent } from './components/modules/comic-detail/comic-detail.component';
import { ComicCardComponent } from './components/common/comic-card/comic-card.component';
import { TopListComponent } from './components/modules/comic-detail/page/top-list/top-list.component';
import { CarouselLandingComponent } from './components/modules/carousel-landing/carousel-landing.component';
import { CarouselLayoutComponent } from './components/modules/carousel-landing/page/carousel-layout/carousel-layout.component';
import { HistoryPageComponent } from './components/modules/history-page/history-page.component';
import { StarRatingComponent } from './components/modules/comic-detail/page/star-rating/star-rating.component';
import { GridComicComponent } from './components/common/grid-comic/grid-comic.component';
import { ChapterListComponent } from './components/modules/comic-detail/page/list-chapter/chapter-list.component';
import { RecentReadComponent } from './components/common/recent-read/recent-read.component';
import { GenreCatagoriesComponent } from './components/common/genre-catagories/genre-catagories.component';
import { NumeralPipe } from './pines/numeral.pipe';
import { DateAgoPipe } from './pines/date-ago.pine';
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
    PaginationComponent,
    NumeralPipe,
    DateAgoPipe,
    HistoryPageComponent,
    StarRatingComponent,
    GridComicComponent,
    ChapterListComponent,
    RecentReadComponent,
    GenreCatagoriesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [provideClientHydration(), provideHttpClient()],
  bootstrap: [AppComponent],
  // exports: [AppModule]
})
export class AppModule {}
