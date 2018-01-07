import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.less']
})
export class AddEventComponent implements OnInit {
  addForm: FormGroup;
  constructor(private fb: FormBuilder, private eventSvc: EventsService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      title: new FormControl(),
      eventType: new FormControl(),
      description: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
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
    console.log(this.addForm.value);
    this.eventSvc.addEvent(this.addForm.value).subscribe(
      (resp) => {
        console.log(resp)
      }
    )
  }
}
