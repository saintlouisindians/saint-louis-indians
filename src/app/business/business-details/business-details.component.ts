import { Component, OnInit ,Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.less']
})
export class BusinessDetailsComponent implements OnInit { 
  @Input() business: any;
  @Input() changed: boolean;
  selectedImage: string;
  showModal: boolean;
  constructor() { }

  ngOnInit() {
    if (this.business && this.business.Images && this.business.Images.length > 0) {
      this.showModal = true;
      this.selectedImage = this.business.Images[0].Image;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.business && this.business.Images && this.business.Images.length > 0) {
      this.selectedImage = this.business.Images[0].Image;
      this.showModal = true;

    }
  }

  onImageSelected(image) {
    this.selectedImage = image.Image;
  }

  closeModal() {
    this.showModal = false;
  }

}
