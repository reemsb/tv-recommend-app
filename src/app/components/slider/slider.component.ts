import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-slider',
  standalone: true,
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [animate('1s')]),
      transition('* => void', [animate('500ms')]),
    ]),
  ],
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() movieitems: Movie[] = [];
  @Input() isBanner = false;

  currentSlideIndex = 0;
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    if (!this.isBanner && this.movieitems.length > 1) {
      this.intervalId = setInterval(() => {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.movieitems.length;
      }, 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
