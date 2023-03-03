import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit{
  constructor(private movieService:MoviesService, private route:ActivatedRoute){ }

  ngOnInit(): void {
    this.route.params.subscribe(({id})=>{
      console.log(id);
    })
}
}
