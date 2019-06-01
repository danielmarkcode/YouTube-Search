import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';
import { VideoObj } from '../services/youtube-video.model';
import { SearchService } from '../services/youtube-search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {


  @Output() loading = new EventEmitter<boolean>();
  @Output() results = new EventEmitter<VideoObj[]>();

  constructor(private youtube: SearchService, private el: ElementRef) { }

  ngOnInit() {
    // Use`keyup`  => observable stream
    fromEvent(this.el.nativeElement, 'keyup').pipe(
      map((e: any) => e.target.value), // get the value of the input
      filter(text => text.length > 1), // filter if empty
      debounceTime(500), //  once every 500ms
      tap(() => this.loading.emit(true)), //  loading
      map((query: string) => this.youtube.search(query)), // search
      switchAll()) // produces values ignoring previous streams.
      .subscribe(  // manipulate on the return of the search
        _results => {
          this.loading.emit(false);
          this.results.emit(_results);
        },
        err => {
          console.log(err);
          this.loading.emit(false);
        },
        () => {
          this.loading.emit(false);
        }
      );
  }

}
