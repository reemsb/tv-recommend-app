import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { TvShow } from '../../models/tvshow';
import { ItemComponent } from '../item/item.component';

type Item = Partial<Movie> & Partial<TvShow>;

@Component({
  selector: 'app-items-banner',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss'],
})
export class ItemsBannerComponent {
  @Input() tvItems: Item[] = [];
  @Input() mainTitle = 'Famous movies / TV shows';
}
