import { NgModule } from '@angular/core';

// import { SharedModule } from '@shared/shared.module';

import { ComicDetailComponent } from './page/comic-detail.component';
import { ComicDetailRoutingModule } from './comic-detail.routing';

@NgModule({
  declarations: [ComicDetailComponent],
  imports: [ComicDetailRoutingModule],
})
export class ComicDetailModule {}
