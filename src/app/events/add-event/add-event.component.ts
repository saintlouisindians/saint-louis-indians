import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { EventsService } from '../../services/events.service';
import { ModalPopUp } from '../../models/modalPopUp';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.less']
})
export class AddEventComponent implements OnInit {
  addForm: FormGroup;
  modal: ModalPopUp;
  constructor(private fb: FormBuilder, private eventSvc: EventsService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      eventType: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      images: this.fb.array([])
    })
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
    })
  }

  removeImage(image) {
    this.addForm.value.images = this.addForm.value.images.filter(item => item != image);
  }

  onSubmit() {
    this.modal = {
      operation: 'open',
      type: 'loading',
      message: 'successfully added'
    }
    this.eventSvc.addEvent(this.addForm.value).subscribe(
      (resp) => {
        this.modal.type = 'success';
      },
      (error) => {
        this.modal.type = 'error';
        this.modal.message = 'Something went wronf. Please try again';
      }
    )
  }
}
