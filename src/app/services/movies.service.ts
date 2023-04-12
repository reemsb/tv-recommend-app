import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movie, MovieDto } from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { Video, VideoDto } from '../models/video';

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
   }))
  }


  searchMovies(page: number=1):Observable<Movie[]> {
    return  this.http.get<MovieDto>(`${this.baseUrl}/movie/popular?page=${page}&api_key=${this.apiKey}`)
    .pipe(switchMap(res => {
       return of (res.results)
    }))
   }

   getMovieDetails(id:string):Observable<Movie> {
      return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`)
   }

   getSimilarMovies(id:string, page:number):Observable<Movie[]> {
      return this.http.get<MovieDto>(`${this.baseUrl}/movie/${id}/recommendations?page=${page}&api_key=${this.apiKey}`)
      .pipe(switchMap(res => {
         return of (res.results)
      }))
   }

   getMovieVideos(id:string):Observable<Video[]> {
      return this.http.get<VideoDto>(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`).pipe(
         switchMap(res=>{
         return of( res.results)
         }))
   }
}
