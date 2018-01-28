import { Component, OnInit, Output } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie.model';
import { ModalPopUp } from '../../models/modalPopUp';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.less']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];
  modal: ModalPopUp;
  selectedMovie: any;
  hideHeaderImg: boolean[]=[];
  constructor(private movieSvc: MoviesService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.modal = {
      type: 'loading',
      operation: 'open',
      message: ''
    }
    this.movieSvc.getMovies(new Date(), new Date()).subscribe(
      (resp) => {
        this.movies = resp;
        this.modal.operation = 'close';
      }
    )
  }

  onReviewClick(movie) {
    this.selectedMovie = movie;
  }

  toggleHeaderImg(i) {
    this.hideHeaderImg[i] ? this.hideHeaderImg[i] = false : this.hideHeaderImg[i] = true;
  }
}
