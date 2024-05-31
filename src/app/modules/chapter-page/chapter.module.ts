import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ChapterPageComponent } from './chapter-page.component';
import { RouterModule } from '@angular/router';
import { ChapterSelectorComponent } from '../../components/common/chapter-selector/chapter-selector.component';

@NgModule({
  declarations: [ChapterPageComponent, ChapterSelectorComponent],

  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ChapterPageComponent }]),
    SharedModule,
  ],
})
export class ChapterModule {}
