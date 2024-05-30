import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user.routing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserPageComponent } from './page/account.component';

@NgModule({
  declarations: [UserPageComponent],
  imports: [UserRoutingModule, CommonModule, ReactiveFormsModule],
})
export class UserModule {}
