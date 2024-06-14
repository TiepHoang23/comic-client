import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPage } from './admin-page.component';
import { AdminNewComicComponent } from './page/newcomic/admin-newcomic.component';
import { AdminComicDetailComponent } from './page/comicdetail/admin-comic-detail.component';
import { AdminDownloadComponent } from './page/download/admin-download.component';

const routes: Routes = [
  {
    path: '',

    component: AdminPage,

    children: [
      {
        path: '',
        component: AdminNewComicComponent,
      },
      {
        path: 'comic/:slug',
        component: AdminComicDetailComponent,
      },
      {
        path: 'download',
        component: AdminDownloadComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
