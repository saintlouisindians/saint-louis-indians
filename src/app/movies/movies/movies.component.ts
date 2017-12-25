import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private movieSvc: MoviesService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(){
    this.movieSvc.getMovies(new Date(),new Date()).subscribe(
      (resp)=>console.log(resp)
    )
  }
}
