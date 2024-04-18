import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicDetailComponent } from './page/comic-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ComicDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicDetailRoutingModule {}
