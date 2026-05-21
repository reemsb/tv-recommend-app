import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TabsModule } from 'primeng/tabs';
import { ChipModule } from 'primeng/chip';
import { Movie } from '../../models/movie';
import { Video } from '../../models/video';
import { MoviesService } from '../../services/movies.service';
import { SliderComponent } from '../../components/slider/slider.component';
import { ItemsBannerComponent } from '../../components/items-banner/items-banner.component';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe,
    UpperCasePipe,
    PaginatorModule,
    TabsModule,
    ChipModule,
    SliderComponent,
    ItemsBannerComponent,
    VideoPlayerComponent,
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly movieService = inject(MoviesService);
  private readonly destroy$ = new Subject<void>();

  movie?: Movie;
  similarMovies: Movie[] = [];
  videos: Video[] = [];

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          const id = params['id'] as string;
          this.loadSimilar(id, 1);
          return this.movieService.getMovieDetails(id);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (movie) => (this.movie = movie),
        error: (err) => console.error('Failed to load movie details', err),
      });

    this.route.params
      .pipe(
        switchMap((params) => this.movieService.getMovieVideos(params['id'] as string)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (videos) => (this.videos = videos),
        error: (err) => console.error('Failed to load videos', err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSimilar(id: string, page: number): void {
    this.movieService.getSimilarMovies(id, page).subscribe({
      next: (movies) => (this.similarMovies = movies),
      error: (err) => console.error('Failed to load similar movies', err),
    });
  }

  onSimilarPageChange(event: PaginatorState): void {
    if (this.movie) {
      this.loadSimilar(this.movie.id, (event.page ?? 0) + 1);
    }
  }
}
