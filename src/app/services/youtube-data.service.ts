import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeDataService {
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  res: any = ['Initial'];
  watchedVideo: any;
  constructor() {}

  changeMessage(message: any) {
    this.messageSource.next(message);
  }
  pushTo(watchedVideo: any) {
    this.res.push(watchedVideo);
    this.changeMessage(this.res);
  }
}
