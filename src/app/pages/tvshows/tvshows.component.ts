import { Component, OnInit, inject } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TvShow } from '../../models/tvshow';
import { TvshowService } from '../../services/tvshow.service';
import { ItemComponent } from '../../components/item/item.component';

@Component({
  selector: 'app-tvshows',
  standalone: true,
  imports: [PaginatorModule, ItemComponent],
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss'],
})
export class TvshowsComponent implements OnInit {
  private readonly showsService = inject(TvshowService);

  tvShows: TvShow[] = [];

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.showsService.searchTvShows(page).subscribe({
      next: (shows) => (this.tvShows = shows),
      error: (err) => console.error('Failed to load TV shows', err),
    });
  }

  onPageChange(event: PaginatorState): void {
    this.loadPage((event.page ?? 0) + 1);
  }
}
