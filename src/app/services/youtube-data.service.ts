import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VideoObj } from '../utils/youtube-video.model';


@Injectable({
  providedIn: 'root'
})
export class YoutubeDataService {
  private messageSource = new BehaviorSubject('Youtube Home');
  private watchedUrlSource = new BehaviorSubject(['']);

  currentMessage = this.messageSource.asObservable();
  currentWatched = this.watchedUrlSource.asObservable();
  watchedResults: any = ['0'];
  watchedVideo: VideoObj;

  changeMessage(message: any) {
    this.messageSource.next(message); // Exchanging Information between components
  }
  watchedUrlmessage(message: any) {
    this.watchedUrlSource.next(message); // Exchanging Information between components
  }
  pushTo(watchedVideo: VideoObj) {
    this.watchedResults.push(watchedVideo.id);  // Exchanging Watched History ID Information between components
    this.changeMessage(this.watchedResults);
    this.watchedUrlmessage(watchedVideo);
  }
}
