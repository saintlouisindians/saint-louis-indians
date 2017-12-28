import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie.model';
import { ModalPopUp } from '../models/modalPopUp';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
    movies: Movie[];
    slide: string;
    modal: ModalPopUp;
    constructor(private movieSvc: MoviesService) {

    }
    ngOnInit() {
        this.getCurrentMovies();
    }

    getCurrentMovies() {
        this.modal = {
            type: 'loading',
            operation: 'open',
            message: ''
        }
        this.movieSvc.getMovies(new Date(), new Date()).subscribe(
            (resp) => {
                this.movies = resp;
                this.slide = 'carousel slide';
                this.modal.operation = 'close';
            }
        )
    }
}