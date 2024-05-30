import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HistoryPageComponent } from './modules/history-page/history-page.component';
import { FollowedPageComponent } from './modules/followed-page/followed-page.component';
import { SearchPageComponent } from './modules/search-page/search-page.component';
import { ChapterPageComponent } from './modules/chapter-page/chapter-page.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
        title: 'Truyên mới cập nhật - [host]',
      },
      {
        path: 'truyen-tranh/:id',
        loadChildren: () =>
          import('./modules/comic-detail/comic-detail.module').then(
            (m) => m.DetailModule
          ),
      },
      {
        path: 'tim-truyen',
        loadChildren: () =>
          import('./modules/search-page/search.module').then((m) => m.SearchModule),
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
        loadChildren: () =>
          import('./modules/chapter-page/chapter.module').then(
            (m) => m.ChapterModule
          ),
      },
    ],
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'tai-khoan',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
