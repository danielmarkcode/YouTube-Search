import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Http404Component } from './utils/http404/http404.component';
import { SearchHomeComponent } from './search-home/search-home.component';

const appRoutes: Routes = [
  { path: 'youtube/feed', component: SearchHomeComponent },
  { path: '', redirectTo: 'youtube/feed', pathMatch: 'full' },
  { path: '**', component: Http404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
