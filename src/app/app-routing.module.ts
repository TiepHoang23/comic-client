import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ChapterPageComponent } from './components/modules/chapter-page/chapter-page.component';
import { NavComponent } from './components/nav/nav.component';
import { HomePageComponent } from './components/modules/home-page/page/home-page.component';
import { ComicDetailComponent } from './components/modules/comic-detail/page/layout/comic-detail.component';
import { ComicService } from './dataSource/services/comic.service';
import { SearchPageComponent } from './components/modules/search-page/search-page.component';
import { HistoryPageComponent } from './components/modules/history-page/history-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: 'truyen-tranh/:id',
        component: ComicDetailComponent,
      },
      {
        path: 'tim-truyen',
        component: SearchPageComponent,
      },
      {
        path: 'lich-su',
        component: HistoryPageComponent,
      },
      {
        path: '',
        loadChildren: () =>
          import('./components/modules/home-page/home-page.module').then(m => m.HomePageModule)
      },

    ]
  },
  {
    path: 'truyen-tranh/:comicid/chapter/:chapterid',
    component: ChapterPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
