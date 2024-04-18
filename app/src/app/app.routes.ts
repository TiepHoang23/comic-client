import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

import { NoAuthGuard } from './core/auth/no-auth';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/auth/login',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [NoAuthGuard],
    pathMatch: 'full',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/modules/home-page/home-page.module').then(
            (m) => m.HomePageModule
          ),
      },
      // {
      //   path: 'about',
      // loadChildren: () =>
      //   import('@modules/about/about.module').then((m) => m.AboutModule),
      // },
    ],
  },
  // {
  //   path: 'auth',
  //   component: AuthLayoutComponent,
  //   loadChildren: () =>
  //     import('./components/modules/authentication/auth.module').then(
  //       (m) => m.AuthModule
  //     ),
  // },
];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, {
//       useHash: true,
//     }),
//   ],
//   exports: [RouterModule],
//   providers: [],
// })
