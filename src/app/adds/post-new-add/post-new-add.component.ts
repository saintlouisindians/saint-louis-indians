import { Component, OnInit } from '@angular/core';
import { ModalPopUp } from '../../models/modalPopUp';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-post-new-add',
  templateUrl: './post-new-add.component.html',
  styleUrls: ['./post-new-add.component.less']
})
export class PostNewAddComponent implements OnInit {

  src: string = '';
  addForm: FormGroup;
  modal: ModalPopUp;
  constructor(private fb: FormBuilder) { }
  subCategories: any[] = [];

  ngOnInit() {
    this.getSubCategories();
    this.addForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(this.src),
      price: new FormControl(0, [Validators.required]),
      subCategoryID: new FormControl(2),
      contactPhone: new FormControl(''),
      contactEmail: new FormControl('', [Validators.required, Validators.email])
    });
  }

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 300,
    resizeMaxWidth: 300
  };

  selected(imageResult: ImageResult) {
    this.src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;

    this.addForm.value.image = this.src;
  }

  getSubCategories() {
    var categories = JSON.parse(localStorage.getItem('navigationData')).Categories;
    categories[0].SubCategories.forEach(element => {
      this.subCategories.push({ Name: element.Name, ID: element.ID })
    });
  }
  onSubmit() {
    console.log(this.addForm.value);
    this.modal = {
      type: 'error',
      operation: 'close',
      message: 'Oops. Something went wrong. Please try again.'
    }
  }
}
