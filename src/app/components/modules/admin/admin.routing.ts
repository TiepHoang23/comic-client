import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdatePageComponent } from './update-page/update-page.component';

const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: '',
        component: UpdatePageComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
