import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin.routing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AdminPage } from './admin-page.component';
import { AdminNewComicComponent } from './page/newcomic/admin-newcomic.component';
import { AdminComicDetailComponent } from './page/comicdetail/admin-comic-detail.component';

@NgModule({
  declarations: [AdminPage,AdminNewComicComponent,AdminComicDetailComponent],
  imports: [
    AdminRoutingModule,
    CommonModule,
    ReactiveFormsModule,

  ],
})
export class AdminModule {}
