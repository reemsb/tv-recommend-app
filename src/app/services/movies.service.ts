import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDto } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl:string ='https://api.themoviedb.org/3'
  apiKey:string ='1f9e4794619064689b9df78dd9e0f6b9'

  constructor(private http: HttpClient) { }

  getMovies(type:string ='upcoming') {
   return  this.http.get(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`);
  }
}
