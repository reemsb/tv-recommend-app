import { Component, OnInit, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Movie } from '../../models/movie';
import { TvShow } from '../../models/tvshow';
import { MoviesService } from '../../services/movies.service';
import { TvshowService } from '../../services/tvshow.service';
import { SliderComponent } from '../../components/slider/slider.component';
import { ItemsBannerComponent } from '../../components/items-banner/items-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, ItemsBannerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private readonly moviesService = inject(MoviesService);
  private readonly showsService = inject(TvshowService);

  upcomingMovies: Movie[] = [];
  popularMovies: Movie[] = [];
  topMovies: Movie[] = [];
  popularShows: TvShow[] = [];

  ngOnInit(): void {
    forkJoin({
      upcoming: this.moviesService.getMovies('upcoming'),
      popular: this.moviesService.getMovies('popular'),
      top: this.moviesService.getMovies('top_rated'),
      shows: this.showsService.getTvShows('popular'),
    }).subscribe({
      next: ({ upcoming, popular, top, shows }) => {
        this.upcomingMovies = upcoming;
        this.popularMovies = popular;
        this.topMovies = top;
        this.popularShows = shows;
      },
      error: (err) => console.error('Failed to load home content', err),
    });
  }
}
