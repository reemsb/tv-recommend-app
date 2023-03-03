import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movie, MovieDto } from '../models/movie';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl:string ='https://api.themoviedb.org/3'
  apiKey:string ='1f9e4794619064689b9df78dd9e0f6b9'

  constructor(private http: HttpClient) { }

  getMovies(type:string ='upcoming', count:number=6):Observable<Movie[]> {
   return  this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`)
   .pipe(switchMap(res => {
      return of (res.results.slice(0,count))
   }));
  }
}
