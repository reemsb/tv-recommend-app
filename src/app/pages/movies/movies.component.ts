import { Component, OnInit, inject } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { ItemComponent } from '../../components/item/item.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [PaginatorModule, ItemComponent],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  private readonly moviesService = inject(MoviesService);

  movies: Movie[] = [];

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.moviesService.searchMovies(page).subscribe({
      next: (movies) => (this.movies = movies),
      error: (err) => console.error('Failed to load movies', err),
    });
  }

  onPageChange(event: PaginatorState): void {
    this.loadPage((event.page ?? 0) + 1);
  }
}
