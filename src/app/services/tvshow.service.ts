import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TvShow, TvShowDto } from '../models/tvshow';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TvshowService {
api_key:string='1f9e4794619064689b9df78dd9e0f6b9'
baseUrl:string='https://api.themoviedb.org/3'

  constructor(private http:HttpClient) { }

  getTvShows(type:string='popular', count:number=6):Observable<TvShow[]> {
    return this.http.get<TvShowDto>(`${this.baseUrl}/tv/${type}?api_key=${this.api_key}`)
    .pipe(switchMap(res => {
      return of (res.results.slice(0,count))
    }));
  }
}
