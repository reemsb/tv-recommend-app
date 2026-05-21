import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TvShow, TvShowDto } from '../models/tvshow';

@Injectable({ providedIn: 'root' })
export class TvshowService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.tmdb.apiBaseUrl;

  private params(extra: Record<string, string | number> = {}): HttpParams {
    let p = new HttpParams().set('api_key', environment.tmdb.apiKey);
    for (const [k, v] of Object.entries(extra)) {
      p = p.set(k, String(v));
    }
    return p;
  }

  getTvShows(type: 'popular' | 'top_rated' | 'on_the_air' | 'airing_today' = 'popular', count = 6): Observable<TvShow[]> {
    return this.http
      .get<TvShowDto>(`${this.baseUrl}/tv/${type}`, { params: this.params() })
      .pipe(map((res) => res.results.slice(0, count)));
  }

  searchTvShows(page = 1): Observable<TvShow[]> {
    return this.http
      .get<TvShowDto>(`${this.baseUrl}/tv/popular`, { params: this.params({ page }) })
      .pipe(map((res) => res.results));
  }
}
