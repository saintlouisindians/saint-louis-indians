import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
//import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalPopUp } from '../../models/modalPopUp';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rate-movie',
  templateUrl: './rate-movie.component.html',
  styleUrls: ['./rate-movie.component.less']
})
export class RateMovieComponent implements OnInit {

  @Input() movie: any;
  @Input() changed: boolean;
  stars: any[];
  rating: number;
  showReviewModal: boolean[]=[];
  review: string;
  movieID: number;
  loadingModal: ModalPopUp;
  
  
  @Output() movieUpdated = new EventEmitter<boolean>();
  constructor(private movieSvc: MoviesService, private router: Router) { }
  isLogedIn: boolean;
  ngOnInit() {
    this.stars = [
      { value: '1', selected: false }, { value: '2', selected: false }, { value: '3', selected: false }, { value: '4', selected: false }, { value: '5', selected: false }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (sessionStorage && sessionStorage.getItem('access_token')) {
      this.isLogedIn = true;
    }
    if (this.movie) {
      this.movieID = this.movie.ID;
      this.showReviewModal[this.movieID] = true;
      if (!this.isLogedIn) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: 'movies' } });
      }
    }

  }

  onStarSelect(star) {
    this.stars.forEach(
      (element) => {
        if (element.value === star.value) {
          for (let i = 1; i <= star.value; i++) {
            this.stars[i - 1].selected = true;
            if (i == star.value) {
              // this.reviewForm.value.rating = star.value;
              this.rating = star.value;
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
    this.loadingModal = {
      operation: 'open',
      message: '',
      type: 'loading'
    }
    this.movieSvc.addReview(reviewForm.value).subscribe(
      (resp) => {
        this.loadingModal.operation = 'close';
        this.showReviewModal[this.movieID] = false;
        this.movieUpdated.emit(true);
      }
    )

  }

  closeModal() {
    this.showReviewModal[this.movieID] = false;
  }
}
