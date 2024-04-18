import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing';
import { LoginFormComponent } from './page/login-form/login-form.component';
import { RegisterFormComponent } from './page/register-form/register-form.component';

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent],
  imports: [AuthRoutingModule],
})
export class AuthModule {}
