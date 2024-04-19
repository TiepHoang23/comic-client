import { NgModule } from '@angular/core';
import { HomePageComponent } from './page/home-page.component';
import { HomePageRoutingModule } from './home-page.routing';
import { CommonModule } from '@angular/common';
import { ComicCardComponent } from '../comic-card/comic-card.component';
@NgModule({
  declarations: [HomePageComponent, ComicCardComponent],
  imports: [HomePageRoutingModule, CommonModule],
  exports: [],
  providers: [],
})
export class HomePageModule {}
