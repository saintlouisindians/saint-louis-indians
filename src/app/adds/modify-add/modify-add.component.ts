import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Add } from '../../models/add.model';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AddsService } from '../../services/adds.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-add',
  templateUrl: './modify-add.component.html',
  styleUrls: ['./modify-add.component.less']
})
export class ModifyAddComponent implements OnInit, OnChanges {
  modifyForm: FormGroup;
  @Input() add: any;
  @Input() changed: boolean;
  showModal: boolean;
  src: string;
  showImgEdit: boolean;
  refreshAdds: boolean;

  @Output() addUpdated = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder, private addsSvc: AddsService, private router: Router) {

  }
  subCategories: any[] = [];

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.subCategories || this.subCategories.length === 0) {
      this.getSubCategories();
    }
    if (this.add) {
      this.src = this.add.Image;
      this.showModal = true;
      this.modifyForm = this.fb.group({
        id: new FormControl(this.add.ID),
        title: new FormControl(this.add.Title, [Validators.required, Validators.maxLength(50)]),
        description: new FormControl(this.add.Description, [Validators.required, Validators.maxLength(500)]),
        image: new FormControl(),
        price: new FormControl(this.add.Price == 0 ? '' : this.add.Price),
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
    this.src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;

    this.modifyForm.value.image = this.src;
  }

  getSubCategories() {
    this.subCategories = [];
    var categories = JSON.parse(localStorage.getItem('navigationData')).Categories;
    categories[0].SubCategories.forEach(element => {
      this.subCategories.push({ Name: element.Name, ID: element.ID })
    });
  }

  closeModal() {
    this.showModal = false;
  }
  onSubmit() {
    this.addsSvc.updateAdd(this.modifyForm.value).subscribe(
      (resp) => {
        this.closeModal();
        this.refreshAdds = true;
        this.addUpdated.emit(true)
      }
    );
  }

  onEditImgClick() {
    this.showImgEdit = true;
  }

  onImgCloseClick() {
    this.src = null;
    this.modifyForm.value.image = null;
  }
}
