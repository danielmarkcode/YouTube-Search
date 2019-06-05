import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';
import { VideoObj } from '../utils/youtube-video.model';
import { SearchService } from '../services/youtube-search.service';
import { YoutubeDataService } from '../services/youtube-data.service';
import { YTConstants } from '../utils/youtube-constants';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {


  @Output() results = new EventEmitter<VideoObj[]>();
  watchedUrlObj: any;
  watchedUrl: any = [];

  constructor(private youtube: SearchService, private el: ElementRef, public watchHistory: YoutubeDataService) { }

  ngOnInit() {

    fromEvent(this.el.nativeElement, 'keyup').pipe(  // Use`keyup`  => observable stream
      map((e: any) => e.target.value),               // get the value of the input
      filter(text => text.length > 1),               // filter if empty
      debounceTime(500),                             //  once every 500ms key press event
      map((query: string) => this.youtube.search(query)), // search service launched for the query
      switchAll())                                    // produces values ignoring previous streams.
      .subscribe(                                     // manipulate on the return of the search
        _results => {
          this.results.emit(_results);
        },
        err => {
          console.log(err);
        }
      );
  }

  homePageLoad() { // Load Home Page Results
    this.youtube.search(YTConstants.YT_HOME_PAGE)
      .subscribe(
        _results => {
          this.results.emit(_results);
        },
        err => {
          console.log(err);
        }
      );
  }

  watchHistoryLoad() { // Load Home Page Results
    this.watchHistory.currentWatched.subscribe(
      message => (this.watchedUrlObj = message)
    );
    this.watchedUrl.push(this.watchedUrlObj);  // Pushing to Watch History Array
  }
}
