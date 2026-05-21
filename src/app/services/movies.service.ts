import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Movie, MovieDto } from '../models/movie';
import { Video, VideoDto } from '../models/video';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.tmdb.apiBaseUrl;

  private params(extra: Record<string, string | number> = {}): HttpParams {
    let p = new HttpParams().set('api_key', environment.tmdb.apiKey);
    for (const [k, v] of Object.entries(extra)) {
      p = p.set(k, String(v));
    }
    return p;
  }

  getMovies(type: 'popular' | 'upcoming' | 'top_rated' = 'upcoming', count = 6): Observable<Movie[]> {
    return this.http
      .get<MovieDto>(`${this.baseUrl}/movie/${type}`, { params: this.params() })
      .pipe(map((res) => res.results.slice(0, count)));
  }

  searchMovies(page = 1): Observable<Movie[]> {
    return this.http
      .get<MovieDto>(`${this.baseUrl}/movie/popular`, { params: this.params({ page }) })
      .pipe(map((res) => res.results));
  }

  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}`, {
      params: this.params(),
    });
  }

  getSimilarMovies(id: string, page: number): Observable<Movie[]> {
    return this.http
      .get<MovieDto>(`${this.baseUrl}/movie/${id}/recommendations`, {
        params: this.params({ page }),
      })
      .pipe(map((res) => res.results));
  }

  getMovieVideos(id: string): Observable<Video[]> {
    return this.http
      .get<VideoDto>(`${this.baseUrl}/movie/${id}/videos`, { params: this.params() })
      .pipe(map((res) => res.results));
  }
}
