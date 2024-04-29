import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ChapterPageComponent } from './components/modules/chapter-page/page/chapter-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/modules/home-page/home-page.module').then(m => m.HomePageModule)
      },
      {
        path: 'truyen-tranh/:comicid/:chapterid',
        loadChildren: () =>
        import('./components/modules/chapter-page/chapter-page.module').then(m => m.ChapterPageModule)
      },
      // {
      //   path: 'about',
      //   loadChildren: () =>
      //     import('@modules/about/about.module').then(m => m.AboutModule)
      // },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
