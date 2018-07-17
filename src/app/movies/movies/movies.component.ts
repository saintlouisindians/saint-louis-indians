import { Component, OnInit, Output } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie.model';
import { ModalPopUp } from '../../models/modalPopUp';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { SpinnerComponent } from 'angular-spinners';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.less']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];
  modal: ModalPopUp;
  selectedMovie: any;
  hideHeaderImg: boolean[] = [];
  reviewClicked: boolean;
  stars: any[];
  loadingModal: ModalPopUp;


  rating: number[] = [];
  review: string[] = [];
  movieID: number;
  rateForm: FormGroup;
  isLogedIn: boolean;
  constructor(private movieSvc: MoviesService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getMovies();
    this.stars = [
      { value: '1', selected: false }, { value: '2', selected: false }, { value: '3', selected: false }, { value: '4', selected: false }, { value: '5', selected: false }
    ];

    this.rateForm = this.fb.group({
      'rating': new FormControl(null, [Validators.required]),
      'review': new FormControl(null, [Validators.required])
    })
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
    if (sessionStorage && sessionStorage.getItem('access_token')) {
      this.isLogedIn = true;
    }
    else {
      window.scrollTo(0, 0);
      this.router.navigate(['/login'], { queryParams: { returnUrl: 'movies' } });
    }
  }

  toggleHeaderImg(i) {
    this.hideHeaderImg[i] ? this.hideHeaderImg[i] = false : this.hideHeaderImg[i] = true;
  }

  onStarSelect(star, movie) {
    this.stars.forEach(
      (element) => {
        if (element.value === star.value) {
          for (let i = 1; i <= star.value; i++) {
            this.stars[i - 1].selected = true;
            if (i == star.value) {
              // this.reviewForm.value.rating = star.value;
              this.rating[movie.ID] = star.value;
            }
          }
          for (let i = 5; i >= star.value; i--) {
            if (this.stars[i]) this.stars[i].selected = false;
          }
        }
      }
    )
  }

  onSubmit(reviewForm) {
    console.log(reviewForm.value);
    this.modal = {
      operation: 'open',
      message: '',
      type: 'loading'
    }
    this.movieSvc.addReview(reviewForm.value).subscribe(
      (resp) => {
        this.modal.operation = 'close';
        this.getMovies();
        //this.showReviewModal[this.movieID] = false;
        //this.movieUpdated.emit(true);
      }
    )

  }
}
