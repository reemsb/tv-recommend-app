import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  standalone: true,
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnChanges {
  @Input() site = 'YouTube';
  @Input() key?: string;
  @Input() id?: string;
  videoUrl?: SafeResourceUrl;

  constructor(private sanitiser: DomSanitizer) {}

  ngOnChanges(): void {
    if (this.site === 'YouTube' && this.key) {
      this.videoUrl = this.sanitiser.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.key}`,
      );
    } else {
      this.videoUrl = undefined;
    }
  }
}
