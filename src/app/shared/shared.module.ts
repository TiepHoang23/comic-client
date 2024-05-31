import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NumeralPipe } from '../pines/numeral.pipe';
import { DateAgoPipe } from '../pines/date-ago.pine';
import { PaginationComponent } from '../components/common/Pagination/pagination.component';
import { GridComicComponent } from '../components/common/grid-comic/grid-comic.component';
import { ComicCardV2Component } from '../components/common/comic-card/Ver2/comic-card-v2.component';
import { ComicCardComponent } from '../components/common/comic-card/Ver1/comic-card.component';
import { PopupDetailComicComponent } from '../components/common/grid-comic/page/popup-detail-comic/popup-detail-comic.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';
import { CommentComponent } from '../components/common/comment/comment.component';
import { GenreCatagoriesComponent } from '../components/common/genre-catagories/genre-catagories.component';
import { ImageLoaderComponent } from '../components/common/image-loader/image-loader.component';

@NgModule({
  declarations: [
    NumeralPipe,
    DateAgoPipe,
    PaginationComponent,
    GridComicComponent,
    ComicCardV2Component,
    ComicCardComponent,
    PopupDetailComicComponent,
    CommentComponent,
    GenreCatagoriesComponent,
    ImageLoaderComponent,
  ],
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule],
  exports: [
    NumeralPipe,
    DateAgoPipe,
    PaginationComponent,
    ComicCardV2Component,
    ComicCardComponent,
    GridComicComponent,
    PopupDetailComicComponent,
    CommentComponent,
    GenreCatagoriesComponent,
    ImageLoaderComponent,
  ],
})
export class SharedModule {}
