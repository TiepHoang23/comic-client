import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin.routing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  // declarations: [],
  imports: [AdminRoutingModule, CommonModule, ReactiveFormsModule],
})
export class AdminModule {}
