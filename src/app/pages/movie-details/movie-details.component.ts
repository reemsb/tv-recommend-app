import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { Video } from '../../models/video';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit{
  movie?:Movie
  similarMovies:any[]=[]
  videos:Video[]=[]
  
  constructor(private movieService:MoviesService, private route:ActivatedRoute){ }

  ngOnInit(): void {
    this.route.params.subscribe(({id})=>{
      //get Movie details
      this.movieService.getMovieDetails(id).subscribe(movie=>this.movie=movie)

      //get recommendations/similar movies
      this.getPagedSimilarMovies(id,1)

      //get movie videos:
      this.movieService.getMovieVideos(id).subscribe(videos=>this.videos=videos);
    })
  }
  getPagedSimilarMovies(id:string,page:number){
    this.movieService.getSimilarMovies(id,page).subscribe(movies=>{
      this.similarMovies=movies
    })
  }
  paginate(event:any) {
    if(this.movie) {
      this.getPagedSimilarMovies(this.movie.id, event.page + 1);
    }
  }

}
