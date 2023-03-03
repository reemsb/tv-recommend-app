import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { TvShow } from 'src/app/models/tvshow';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
    @Input() tvItem?:Movie & TvShow

  
}
