import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations:[
    //define a trigger to fire our animationwhich we will use in our template
    trigger('slideFade',[
      //define the end state of this div slide: the hidden state 
      state('void', style({opacity:0})),
      //the start state is the * or the current state: will hide in 1s
      transition('void => *',[animate('1s')]),
      //from original state to end state: will show in half of a second
      transition('* => void',[animate('500ms')])
      // or if it is the same transition in both direction of the state
      // transition('void <=> *',[animate('1s')]),
    ])
  ]
})
export class SliderComponent implements OnInit{
  @Input() movieitems: Movie[]=[];
  currentSlideIndex : number = 0;

  ngOnInit() {
    setInterval(()=>{
      this.currentSlideIndex=++this.currentSlideIndex % this.movieitems.length
    },5000)
  }
}
