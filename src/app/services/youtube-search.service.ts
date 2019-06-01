import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { YTConstants } from '../utils/youtube-constants';
import { Observable } from 'rxjs';
import { VideoObj } from '../utils/youtube-video.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(query: string): Observable<VideoObj[]> {
    console.log(YTConstants);
    const params: string = [
      `q=${query}`,
      `key=${YTConstants.API_KEY}`,
      `part=snippet`,
      `type=video`,
      `maxResults=30`
    ].join('&');

    const queryUrl = `${YTConstants.API_URL}?${params}`;

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
