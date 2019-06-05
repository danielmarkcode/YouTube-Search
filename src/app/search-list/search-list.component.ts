import { Component, OnInit, Input } from '@angular/core';
import { VideoObj } from '../utils/youtube-video.model';
import { YoutubeDataService } from '../services/youtube-data.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  @Input() result: VideoObj;

  watchHistoryData: any;

  constructor(public watchHistory: YoutubeDataService) { }

  ngOnInit() {
    this.watchHistory.currentMessage.subscribe(message => this.watchHistoryData = message);
  }

  openVideo() {
    window.open(this.result.videoUrl); // Open Video on Click on thumbnail
    this.watchHistory.pushTo(this.result); // Remove watched Video from search list
  }
}
