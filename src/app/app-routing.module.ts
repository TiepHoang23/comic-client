import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ChapterPageComponent } from './components/modules/chapter-page/chapter-page.component';
import { NavComponent } from './components/nav/nav.component';
import { HomePageComponent } from './components/modules/home-page/home-page.component';
import { ComicDetailComponent } from './components/modules/comic-detail/comic-detail.component';
import { ComicService } from './dataSource/services/comic.service';
import { SearchPageComponent } from './components/modules/search-page/search-page.component';
import { HistoryPageComponent } from './components/modules/history-page/history-page.component';
import { FollowedPageComponent } from './components/modules/followed-page/followed-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
        title: 'Truyên mới cập nhật - [host]',
      },
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
        title: 'Lịch sử đọc truyện - [host]',
      },
      {
        path: 'theo-doi',
        component: FollowedPageComponent,
        title: 'Truyện đang theo dõi - [host]',
      },
      {
        path: 'truyen-tranh/:comicid/chapter/:chapterid',
        component: ChapterPageComponent,
      },
    ],
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./components/modules/authentication/auth.module').then(
        (m) => m.AuthModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/modules/admin/admin.module').then(
        (m) => m.AdminModule
      ),
  },
  {
    path: 'tai-khoan',
    loadChildren: () =>
      import('./components/modules/user-page/user.module').then(
        (m) => m.UserModule
      ),
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        anchorScrolling: 'enabled',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
