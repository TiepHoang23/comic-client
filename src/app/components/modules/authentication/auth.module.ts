import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing';
import { LoginFormComponent } from './page/login-form/login-form.component';
import { RegisterFormComponent } from './page/register-form/register-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterFormComponent, LoginFormComponent],
  imports: [AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule],
})
export class AuthModule { }
