import { NgModule, inject } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { HomePageComponent } from './page/home-page.component';
import { ComicDetailComponent } from '../comic-detail/page/comic-detail.component';
import { ComicService } from '../../../dataSource/services/comic.service';

export const routes: Routes = [
  //   {
  //     path: '',
  //     redirectTo: 'home',
  //     pathMatch: 'full',
  //   },
  {
    path: '',
    component: HomePageComponent,
  },
  //   {
  //     path: 'comic/:id',
  //     component: ComicDetailComponent,
  //     resolve: (route: ActivatedRouteSnapshot) => {
  //       inject(ComicService).getComicById(route.params['id']);
  //     },
  //   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
