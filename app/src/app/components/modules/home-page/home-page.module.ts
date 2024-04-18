import { NgModule } from '@angular/core';
import { HomePageComponent } from './page/home-page.component';
import { HomePageRoutingModule } from './home-page.routing';
import { ComicDetailComponent } from '../comic-detail/page/comic-detail.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [HomePageComponent, ComicDetailComponent],
  imports: [HomePageRoutingModule, CommonModule],
  exports: [],
  providers: [],
})
export class HomePageModule {}
