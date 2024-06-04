import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ChapterListComponent } from './page/list-chapter/chapter-list.component';
import { ComicDetailComponent } from './comic-detail.component';
// import { TopListComponent } from './page/top-list/top-list.component';
import { StarRatingComponent } from './page/star-rating/star-rating.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChapterListComponent,
    ComicDetailComponent,

    StarRatingComponent,
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: ComicDetailComponent }]),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class DetailModule {}
