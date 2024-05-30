import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ChapterPageComponent } from './chapter-page.component';
import {  RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChapterPageComponent],

  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ChapterPageComponent }]),
    SharedModule,
  ],
})
export class ChapterModule {}
