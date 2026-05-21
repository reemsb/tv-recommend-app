import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./pages/movies/movies.component').then((m) => m.MoviesComponent),
  },
  {
    path: 'tvshows',
    loadComponent: () =>
      import('./pages/tvshows/tvshows.component').then((m) => m.TvshowsComponent),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/categories/categories.component').then(
        (m) => m.CategoriesComponent,
      ),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./pages/movie-details/movie-details.component').then(
        (m) => m.MovieDetailsComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
