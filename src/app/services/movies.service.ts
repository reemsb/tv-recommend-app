import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getUpcomingMovies() {
   return  this.http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=1f9e4794619064689b9df78dd9e0f6b9');
  }
}
