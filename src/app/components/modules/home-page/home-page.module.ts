import { NgModule } from '@angular/core';
import { HomePageComponent } from './page/home-page.component';
import { HomePageRoutingModule } from './home-page.routing';
import { CommonModule } from '@angular/common';
import { ComicCardComponent } from '../comic-card/comic-card.component';
import { ComicDetailComponent } from '../comic-detail/page/layout/comic-detail.component';
import { TopListComponent } from '../comic-detail/page/top-list/top-list.component';
import { CarouselLandingComponent } from '../carousel-landing/carousel-landing.component';
import { CarouselLayoutComponent } from '../carousel-landing/page/carousel-layout/carousel-layout.component';
import { ListCardSkeletonComponent } from './page/list-card-skeleton/list-card-skeleton/list-card-skeleton.component';
import { PaginationComponent } from '../../common/Pagination/pagination.component';
import { AppModule } from '../../../app.module';
import { NumeralPipe } from '../../../pines/numeral.pipe';
// import { CarouselLandingComponent } from '../carousel-landing/carousel-landing.component';

@NgModule({
  declarations: [


    HomePageComponent,
    ComicCardComponent,
    ComicDetailComponent,
    TopListComponent,
    CarouselLandingComponent,
    CarouselLayoutComponent,
    ListCardSkeletonComponent,
    NumeralPipe,
  ],
  imports: [HomePageRoutingModule, CommonModule],
  exports: [],
  providers: [],
})
export class HomePageModule { }
