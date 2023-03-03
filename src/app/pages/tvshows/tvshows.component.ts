import { Component, OnInit } from '@angular/core';
import { TvshowService } from 'src/app/services/tvshow.service';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss']
})
export class TvshowsComponent implements OnInit{
  tvShows?:any[]

  constructor(private showsService:TvshowService) {}
  
  ngOnInit(): void {
    this.getPaginatedShows(1)
    }

  getPaginatedShows(page:number){
    this.showsService.searchTvShows(page).subscribe(shows=>{
      this.tvShows=shows
      })
  }

  paginate(event:any) {
   this.getPaginatedShows(++event.page);
  }
}
