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
          this.moviesService.getMovies(type).subscribe((response: any) => {
            this.popularMovies = response.results.slice(0,6);
          });
          break;

          case 'top_rated':
            this.moviesService.getMovies(type).subscribe((response: any) => {
              this.topMovies = response.results.slice(0,6);
            });
          break;
          
        default:'upcoming'
        this.moviesService.getMovies(type).subscribe((response: any) => {
          this.upcomingMovies = response.results.slice(0,6);
        });
          break;
      }
    });

    //retrieve popular tv shows
    this.showsService.getTvShows('popular').subscribe((response:any)=>{
        this.popularShows=response.results.slice(0,6);
    })
  }
}
