import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { SearchPageComponent } from './search-page.component';

@NgModule({
    declarations: [SearchPageComponent],
    imports: [
        RouterModule.forChild([{ path: '', component: SearchPageComponent }]),
        CommonModule,
        ReactiveFormsModule,
        SharedModule, FormsModule
    ],
})
export class SearchModule { }
