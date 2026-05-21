import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';
import { TvShow } from '../../models/tvshow';

type Item = Partial<Movie> & Partial<TvShow>;

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() tvItem?: Item;
}
