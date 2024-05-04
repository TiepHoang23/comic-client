import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
// import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ChapterPageComponent } from './components/modules/chapter-page/chapter-page.component';
import { ListSearchComicComponent } from './components/nav/list-search-comic/list-search-comic.component';
import { SearchPageComponent } from './components/modules/search-page/search-page.component';
// import { PageComponent } from './app/components/modules/comic-detail/page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavComponent,
    FooterComponent,
    ChapterPageComponent,
    ListSearchComicComponent,
    SearchPageComponent
    // PageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
  // exports: [AppModule]
})
export class AppModule { }