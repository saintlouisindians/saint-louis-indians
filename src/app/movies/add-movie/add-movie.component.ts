import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { MoviesService } from '../../services/movies.service';
import { ModalPopUp } from '../../models/modalPopUp';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.less']
})
export class AddMovieComponent implements OnInit {

  addForm: FormGroup;
  modal: ModalPopUp;
  constructor(private fb: FormBuilder, private movieSvc: MoviesService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: new FormControl(),
      description: new FormControl(''),
      language: new FormControl('Telugu'),
      director: new FormControl(),
      producer: new FormControl(),
      musicDirector: new FormControl(),
      cast: new FormControl(),
      image: new FormControl(),
      releaseDate: new FormControl(new Date()),
      lastDate: new FormControl(new Date())
    })
  }

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 500,
    resizeMaxWidth: 500
  };

  selected(imageResult: ImageResult) {
    this.addForm.value.image = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.modal = {
        type: 'loading',
        operation: 'open',
        message: 'successfully added',
        returnUrl: 'movies'
      }
      this.addMovie();
    }
  }

  addMovie() {
    this.movieSvc.addMovie(this.addForm.value).subscribe(
      (resp) => {
        this.modal.type = 'success';
      },
      (error) => {
        this.modal.type = 'error';
        this.modal.message = 'Something went wrong. Please try again.';
      }
    );
  }

}
