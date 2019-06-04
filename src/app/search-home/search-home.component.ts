import { Component, OnInit } from '@angular/core';
import { VideoObj } from '../utils/youtube-video.model';
import { YoutubeDataService } from '../services/youtube-data.service';
import { YTConstants } from '../utils/youtube-constants';
import { SearchService } from '../services/youtube-search.service';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.css']
})
export class SearchHomeComponent implements OnInit {
  results: VideoObj[];
  resultList: VideoObj[] = [];
  filteredArr: VideoObj[] = [];
  message = '';
  watchedUrl: any;
  filteringRes: VideoObj[];
  searchResponse: any;
  queryKey: any;
  newArr: VideoObj[];

  constructor(public watchHistory: YoutubeDataService, private youtube: SearchService) { }
  ngOnInit() {
    this.watchHistory.currentMessage.subscribe(
      message => (this.watchedUrl = message)
    );
  }

  fetchResult(results: VideoObj[]): void {
    this.filteredArr = [];
    this.resultList = [];
    this.filteringRes = results;

    for (let i = this.filteringRes.length - 1; i >= 0; --i) { // If Video is watced already it is pushed out of the Video Array
      if (this.watchedUrl.indexOf(this.filteringRes[i].id) === -1) {
        this.filteredArr.push(this.filteringRes[i]);
      }
    }
    this.resultList = this.filteredArr; // Filtered Results List
    if (this.resultList.length === 0) {
      this.message = YTConstants.NOT_FOUND; // Video Not Found
    } else {
      this.message = YTConstants.TOP_RESULTS;
    }
  }

  onScroll () {
    console.log('onScroll()');
    this.youtube.searchMessage.subscribe(
      message => (this.searchResponse = message)
    );
    this.youtube.queryMessage.subscribe(
      message => (this.queryKey = message)
    );
    console.log('RecievedNextPageToken', this.searchResponse.nextPageToken);
    console.log('TypedQuery', this.queryKey);
    this.youtube.lazySearch(this.queryKey , this.searchResponse.nextPageToken).subscribe(
    message => (this.newArr = message)
  );
  console.log(this.newArr);
  for (let i = this.newArr.length - 1; i >= 0; --i) { // If Video is watced already it is pushed out of the Video Array
      this.resultList.push(this.newArr[i]);
  }
  }

  loadTrending() {
    window.open(YTConstants.TRENDING_URL);
  }
}
