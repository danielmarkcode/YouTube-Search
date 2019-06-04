import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchService } from './services/youtube-search.service';
import { SearchHomeComponent } from './search-home/search-home.component';
import { Http404Component } from './utils/http404/http404.component';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ButtonsModule, WavesModule, CardsFreeModule , NavbarModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SearchListComponent,
    Http404Component,
    SearchHomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    InfiniteScrollModule,
    MDBBootstrapModule,
    ButtonsModule, WavesModule, CardsFreeModule, NavbarModule

  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
