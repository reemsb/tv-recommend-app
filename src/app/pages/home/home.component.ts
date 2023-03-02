import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { MovieType } from './homeUtils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topMovies: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    Object.values(MovieType).forEach(type => {
      switch (type) {
        case 'popular':
          this.moviesService.getMovies(type).subscribe((response: any) => {
            this.popularMovies = response.results;
          });
          break;

          case 'top_rated':
            this.moviesService.getMovies(type).subscribe((response: any) => {
              this.topMovies = response.results;
            });
          break;
          
        default:'upcoming'
        this.moviesService.getMovies(type).subscribe((response: any) => {
          this.upcomingMovies = response.results;
        });
          break;
      }
    });
  }
}
