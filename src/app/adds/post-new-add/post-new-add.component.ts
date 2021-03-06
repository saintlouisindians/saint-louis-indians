import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ModalPopUp } from '../../models/modalPopUp';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AddsService } from '../../services/adds.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-post-new-add',
  templateUrl: './post-new-add.component.html',
  styleUrls: ['./post-new-add.component.less']
})
export class PostNewAddComponent implements OnInit {

  src: string = '';
  addForm: FormGroup;
  modal: ModalPopUp;
  constructor(private fb: FormBuilder, private addsSvc: AddsService) { }
  subCategories: any[] = [];
   mask: any[] = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  ngOnInit() {
    this.getSubCategories();
    this.addForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      images: this.fb.array([]),
      price: new FormControl(),
      subCategoryID: new FormControl(1),
      contactPhone: new FormControl('', [Validators.maxLength(10), Validators.pattern('[1-9]{1}[0-9]{9}')]),
      contactEmail: new FormControl('', [Validators.email, Validators.required])
    });
  }

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 500,
    resizeMaxWidth: 500
  };

  selected(imageResult: ImageResult) {
    this.addForm.value.images.push({
      image: imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL
    });

    //this.addForm.value.image = this.src;
  }

  getSubCategories() {
    this.modal = {
      type: 'loading',
      operation: 'open',
      message: 'Successfully added'
    }
    var categories = JSON.parse(localStorage.getItem('navigationData')).Categories;
    categories[0].SubCategories.forEach(element => {
      this.subCategories.push({ Name: element.Name, ID: element.ID })
    });
    this.modal.operation = 'close';
  }

  removeImage(image) {
    this.addForm.value.images = this.addForm.value.images.filter(item => item != image);
  }
  onSubmit() {
    this.modal.operation = 'open';
    if (this.addForm.valid) {
      this.createAdd();
    }
  }

  createAdd() {
    this.addsSvc.createAdd(this.addForm.value).subscribe(
      (resp) => {
        this.modal.type = 'success';
        this.modal.returnUrl='home'
      },
      (error) => {
        this.modal.type = 'error';
        this.modal.message = 'Something went wrong. Please try again.';
      }
    )
  }

  ngAfterViewChecked(){
  console.log($('#contactPhone'));
  }
}
