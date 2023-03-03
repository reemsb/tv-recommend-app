import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { TvShow } from '../../models/tvshow';

@Component({
  selector: 'items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent {
  @Input() tvItems:any[]= [];
  @Input() mainTitle:string='Famous movies/TV shows';
}
