import { NgModule } from '@angular/core';
import { HomePageComponent } from './page/home-page.component';
import { HomePageRoutingModule } from './home-page.routing';
import { CommonModule } from '@angular/common';
import { ComicCardComponent } from '../comic-card/comic-card.component';
import { ComicDetailComponent } from '../comic-detail/page/comic-detail.component';
@NgModule({
  declarations: [HomePageComponent, ComicCardComponent,ComicDetailComponent],
  imports: [HomePageRoutingModule, CommonModule],
  exports: [],
  providers: [],
})
export class HomePageModule {}
