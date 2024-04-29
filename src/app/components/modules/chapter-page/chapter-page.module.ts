import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChapterPageRoutingModule } from "./chapter-page.routing";
import { ChapterPageComponent } from "./page/chapter-page.component";
import { ComicDetailComponent } from "../comic-detail/page/layout/comic-detail.component";
import { ComicCardComponent } from "../comic-card/comic-card.component";
import { TopListComponent } from "../comic-detail/page/top-list/top-list.component";

@NgModule({
  declarations: [ChapterPageComponent],
  imports: [ ChapterPageRoutingModule,CommonModule],
  exports: [],
  providers: [],
})
export class ChapterPageModule { }