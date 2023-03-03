import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{
  movies:any[] =[]
  constructor(private moviesService:MoviesService) {

  }
  ngOnInit(): void {
    this.moviesService.searchMovies().subscribe((movies)=>{
      this.movies = movies;
    })
  }
}
