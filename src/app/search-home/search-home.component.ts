import { Component, OnInit } from '@angular/core';
import { VideoObj } from '../utils/youtube-video.model';
import { YoutubeDataService } from '../services/youtube-data.service';
import { YTConstants } from '../utils/youtube-constants';

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

  constructor(public watchHistory: YoutubeDataService) { }
  ngOnInit() {
    this.watchHistory.currentMessage.subscribe(
      message => (this.watchedUrl = message)
    );
  }

  fetchResult(results: VideoObj[]): void {
    this.filteredArr = [];
    this.resultList = [];
    this.filteringRes = results;

    for (let i = this.filteringRes.length - 1; i >= 0; --i) {
      if (this.watchedUrl.indexOf(this.filteringRes[i].id) === -1) {
        this.filteredArr.push(this.filteringRes[i]);
      }
    }
    this.resultList = this.filteredArr;
    if (this.resultList.length === 0) {
      this.message = YTConstants.NOT_FOUND;
    } else {
      this.message = YTConstants.TOP_RESULTS;
    }
  }

  w3_open() {
    document.getElementById('main').style.marginLeft = '20%';
    document.getElementById('mySidebar').style.width = '20%';
    document.getElementById('mySidebar').style.display = 'block';
    document.getElementById('openNav').style.display = 'none';
  }
  w3_close() {
    document.getElementById('main').style.marginLeft = '0%';
    document.getElementById('mySidebar').style.display = 'none';
    document.getElementById('openNav').style.display = 'inline-block';
  }

  loadTrending() {
    window.open(YTConstants.TRENDING_URL);
  }
}
