import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CarouselLandingComponent } from './carousel-landing/carousel-landing.component';
import { CarouselLayoutComponent } from './carousel-landing/page/carousel-layout/carousel-layout.component';
import { RecentReadComponent } from '../../components/common/recent-read/recent-read.component';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CarouselLandingComponent,
    CarouselLayoutComponent,
    RecentReadComponent,
    HomePageComponent,
  ],

  imports: [

    RouterModule.forChild([{ path: '', component: HomePageComponent }]),
    CommonModule,
    SharedModule,
  ],
})
export class HomeModule {}
