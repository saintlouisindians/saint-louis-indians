import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../services/business.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Business } from '../../models/business.model';
import { ModalPopUp } from '../../models/modalPopUp';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';


@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.less']
})
export class AddBusinessComponent implements OnInit {

  addBusinessForm: FormGroup;
  businessSubCategories: any[] = [];
  modal: ModalPopUp;
  constructor(private businessSvc: BusinessService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getBusSubCategories();
    this.addBusinessForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.maxLength(500)]),
      webLink: new FormControl('', [Validators.maxLength(50)]),
      address: this.fb.group(
        {
          address1: new FormControl(null, [Validators.required]),
          address2: new FormControl(null),
          state: new FormControl(null, [Validators.required]),
          city: new FormControl(null, [Validators.required]),
          zipCode: new FormControl(null, [Validators.required, Validators.pattern('[1-9]{1}[0-9]{4}')])
        }
      ),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')]),
      image: new FormControl(null),
      subCategoryID: new FormControl(1)
    })
  }

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 500,
    resizeMaxWidth: 500
  };

  selected(imageResult: ImageResult) {
    this.addBusinessForm.value.image = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
  }
  getBusSubCategories() {
    let categories = JSON.parse(localStorage.getItem('navigationData')).BusinessCategories;
    categories.forEach(element => {
      element.BusinessSubCategories.forEach(element => {
        this.businessSubCategories.push({ Name: element.Name, ID: element.ID })
      });
    });
  }

  addBusiness() {
    if (this.addBusinessForm.valid) {
      this.modal = {
        type: 'loading',
        operation: 'open',
        message: 'Successfullt added.'
      }
      this.businessSvc.addBusiness(this.addBusinessForm.value).subscribe(
        (resp) => {
          this.modal.type = 'success';
        },
        (error) => {
          this.modal.type = 'error';
          this.modal.message = 'Something went wrong. Please tryagain.'
        }
      )
    }
  }

  onSubmit() {
    this.addBusiness();
  }
}
