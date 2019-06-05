import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { YTConstants } from '../utils/youtube-constants';
import { Observable , BehaviorSubject } from 'rxjs';
import { VideoObj } from '../utils/youtube-video.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchReponse = new BehaviorSubject<any>('');
  searchMessage = this.searchReponse.asObservable();

  private searchedQuery = new BehaviorSubject<any>('');
  queryMessage = this.searchedQuery.asObservable();

  constructor(private http: HttpClient) { }

  search(query: string): Observable<VideoObj[]> { // Search Service
    const params: string = [ // Search Service query Params
      `q=${query}`,
      `key=${YTConstants.API_KEY}`,
      `part=${YTConstants.PART}`,
      `type=${YTConstants.TYPE}`,
      `maxResults=${YTConstants.MAX_RESULTS}`
    ].join('&');

    const queryUrl = `${YTConstants.API_URL}?${params}`;
    this.searchedQuery.next(query); // Exchanging Information between components

    return this.http.get(queryUrl).pipe(map(response => {
      this.searchReponse.next(response); // Exchanging Information between components
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




  lazySearch(query: string, nextPage: any, maxResult: number): Observable<VideoObj[]> { // Search Service
    const params: string = [ // Search Service query Params
      `pageToken=${nextPage}`,
      `q=${query}`,
      `key=${YTConstants.API_KEY}`,
      `part=${YTConstants.PART}`,
      `type=${YTConstants.TYPE}`,
      `maxResults=${maxResult}`
    ].join('&');

    const queryUrl = `${YTConstants.API_URL}?${params}`;
    console.log(queryUrl);
    return this.http.get(queryUrl).pipe(map(response => {
      this.searchReponse.next(response); // Exchanging Information between components
      console.log(response);
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
