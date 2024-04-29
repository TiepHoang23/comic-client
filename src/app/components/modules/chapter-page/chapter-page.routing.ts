import { NgModule, inject } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { ComicService } from '../../../dataSource/services/comic.service';
import { ComicDetailComponent } from '../comic-detail/page/layout/comic-detail.component';
import { ChapterPageComponent } from './page/chapter-page.component';

export const routes: Routes = [

  {
    path: '',
    component: ChapterPageComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChapterPageRoutingModule { }
