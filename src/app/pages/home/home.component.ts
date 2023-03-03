import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { VarietyType } from './homeUtils';
import { TvShow } from '../../models/tvshow';
import { TvshowService } from '../../services/tvshow.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topMovies: Movie[] = [];
  popularShows:TvShow[]=[];

  constructor(private moviesService: MoviesService, private showsService:TvshowService) {}

  ngOnInit(): void {
    //retrieves types of movies:
    Object.values(VarietyType).forEach(type => {
      switch (type) {
        case 'popular':
          this.moviesService.getMovies(type).subscribe((response:Movie[]) => {
            this.popularMovies = response;
          });
          break;

          case 'top_rated':
            this.moviesService.getMovies(type).subscribe((response: Movie[]) => {
              this.topMovies = response;
            });
          break;
          
        default:'upcoming'
        this.moviesService.getMovies(type).subscribe((response: Movie[]) => {
          this.upcomingMovies = response;
        });
          break;
      }
    });

    //retrieve popular tv shows
    this.showsService.getTvShows('popular').subscribe((response:TvShow[])=>{
        this.popularShows=response;
    })
  }
}
