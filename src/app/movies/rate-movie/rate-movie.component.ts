import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rate-movie',
  templateUrl: './rate-movie.component.html',
  styleUrls: ['./rate-movie.component.less']
})
export class RateMovieComponent implements OnInit {

  @Input() movie: any;
  stars:any[];
  constructor() { }

  ngOnInit() {
 
  }

  ngOnChanges(changes: SimpleChanges) {
    //if (this.movie) {

   // }
  }
}
