import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ChapterPageComponent } from './components/modules/chapter-page/page/chapter-page.component';
import { NavComponent } from './components/nav/nav.component';
import { HomePageComponent } from './components/modules/home-page/page/home-page.component';
import { ComicDetailComponent } from './components/modules/comic-detail/page/layout/comic-detail.component';
import { ComicService } from './dataSource/services/comic.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/modules/home-page/home-page.module').then(m => m.HomePageModule)
      },
      {
        path: 'truyen-tranh/:id',
        component: ComicDetailComponent,
      },
      {
        path: 'truyen-tranh/:comicid/:chapterid',
        component: ChapterPageComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
