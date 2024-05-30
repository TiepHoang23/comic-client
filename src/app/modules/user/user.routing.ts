import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent } from './page/account.component';
import { LayoutComponent } from '../../components/layout/layout.component';
// import { UpdatePageComponent } from './update-page/update-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: '',
        component: UserPageComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
