import { Component, OnInit } from '@angular/core';
import { VideoObj } from './services/youtube-video.model';
import { YoutubeDataService } from './services/youtube-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  results: VideoObj[];
  resultList: VideoObj[] = [];
  filteredArr: VideoObj[] = [];
  loading: boolean;
  message = '';
  trendingUrl = 'https://www.youtube.com/feed/trending';
  watchedUrl: any;
  removedClickedUrl: string;
  filteringRes: VideoObj[];
  arrtemp: any[];

  constructor(public watchHistory: YoutubeDataService) {}
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
      this.message = 'Not found...';
    } else {
      this.message = 'Top results:';
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
    window.open(this.trendingUrl);
  }
}
