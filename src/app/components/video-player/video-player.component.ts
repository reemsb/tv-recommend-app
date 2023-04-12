import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit{
  @Input() site:string ='YouTube'
  @Input() key?:string
  @Input() id?:string
  videoUrl?:SafeResourceUrl;

  constructor(private sanitiser:DomSanitizer){}
  ngOnInit(): void {
    this.videoUrl=this.getSafeUrl('https://www.youtube.com/embed/' + this.key);
  }
  getSafeUrl(url:string){
    return this.sanitiser.bypassSecurityTrustResourceUrl(url);
  }

}
