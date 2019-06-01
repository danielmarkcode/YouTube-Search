import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { VideoObj } from './youtube-video.model';

const API_KEY = 'AIzaSyBviiReWD_yV-OSTlyU2ujj05h3sMBz7Bs';
const API_URL = 'https://www.googleapis.com/youtube/v3/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(query: string): Observable<VideoObj[]> {
    const params: string = [
      `q=${query}`,
      `key=${API_KEY}`,
      `part=snippet`,
      `type=video`,
      `maxResults=25`
    ].join('&');

    const queryUrl = `${API_URL}?${params}`;

    return this.http.get(queryUrl).pipe(map(response => {
      return response['items'].map(item => {
        return new VideoObj({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url
        });
      });
    }));
  }
}
