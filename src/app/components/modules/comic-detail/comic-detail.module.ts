import { NgModule } from '@angular/core';

// import { SharedModule } from '@shared/shared.module';
import { ComicDetailRoutingModule } from './comic-detail.routing';
import { CommonModule } from '@angular/common';
import { TopListComponent } from './page/top-list/top-list.component';
import { ComicDetailComponent } from './page/layout/comic-detail.component';

@NgModule({
  declarations: [ComicDetailComponent, TopListComponent],
  imports: [ComicDetailRoutingModule, CommonModule, NgModule],
})
export class ComicDetailModule {}
