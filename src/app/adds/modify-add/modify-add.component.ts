import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Add } from '../../models/add.model';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AddsService } from '../../services/adds.service'

@Component({
  selector: 'app-modify-add',
  templateUrl: './modify-add.component.html',
  styleUrls: ['./modify-add.component.less']
})
export class ModifyAddComponent implements OnInit, OnChanges {
  modifyForm: FormGroup;
  @Input() add: any;
  constructor(private fb: FormBuilder, private addsSvc: AddsService) {

  }
  subCategories: any[] = [];

  ngOnInit() {
        this.getSubCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.add) {
      // this.add = changes.add.currentValue;
      this.modifyForm = this.fb.group({
        title: new FormControl(this.add.Title, [Validators.required, Validators.maxLength(50)]),
        description: new FormControl(this.add.Description, [Validators.required, Validators.maxLength(500)]),
        image: new FormControl(this.add.Image),
        price: new FormControl(this.add.Price),
        subCategoryID: new FormControl(this.add.SubCategoryID),
        contactPhone: new FormControl(this.add.ContactPhone, [Validators.maxLength(10), Validators.pattern('[1-9]{1}[0-9]{9}')]),
        contactEmail: new FormControl(this.add.ContactEmail, [Validators.email, Validators.required])
      });
    }
  }

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 300,
    resizeMaxWidth: 300
  };

  selected(imageResult: ImageResult) {
    this.modifyForm.value.image = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
  }

  getSubCategories() {
    var categories = JSON.parse(localStorage.getItem('navigationData')).Categories;
    categories[0].SubCategories.forEach(element => {
      this.subCategories.push({ Name: element.Name, ID: element.ID })
    });
  }

  closeModal() {
    this.add = null
  }
}
