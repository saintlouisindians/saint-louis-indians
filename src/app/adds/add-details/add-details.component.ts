import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.less']
})
export class AddDetailsComponent implements OnInit {

  @Input() add: any;
  @Input() changed: boolean;
  selectedImage: string;
  showModal: boolean;
  constructor() { }

  ngOnInit() {
    if (this.add && this.add.Images && this.add.Images.length > 0) {
      this.showModal = true;
      this.selectedImage = this.add.Images[0].Image;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.add && this.add.Images && this.add.Images.length > 0) {
      this.selectedImage = this.add.Images[0].Image;
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
