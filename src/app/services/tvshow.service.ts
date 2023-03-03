import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TvshowService {
api_key:string='1f9e4794619064689b9df78dd9e0f6b9'
baseUrl:string='https://api.themoviedb.org/3'

  constructor(private http:HttpClient) { }

  getTvShows(type:string='popular') {
   return this.http.get(`${this.baseUrl}/tv/${type}?api_key=${this.api_key}`);
  }
}
