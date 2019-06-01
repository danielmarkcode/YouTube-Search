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
  watchedVideo: any = [];
  res: any = [];

  data: string;
  constructor(public watchHistory: YoutubeDataService) { }

  ngOnInit() {
    this.watchHistory.currentMessage.subscribe(message => this.data = message);
  }

  openVideo() {
    window.open(this.result.videoUrl);
    this.watchedVideo = this.result.id;
    this.watchHistory.pushTo(this.watchedVideo); // Remove watched Video from search list
    return this.watchedVideo;
  }
}
