import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user.routing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  // declarations: [],
  imports: [UserRoutingModule, CommonModule, ReactiveFormsModule],
})
export class UserModule { }
