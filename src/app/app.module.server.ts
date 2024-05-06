import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { RouterOutlet } from '@angular/router';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
// import { NavComponent } from './components/nav/nav.component';

@NgModule({
  imports: [
    // AppModule,
    ServerModule,
    RouterOutlet,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
