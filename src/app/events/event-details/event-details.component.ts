import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.less']
})
export class EventDetailsComponent implements OnInit {

  event: any;
  selectedImg: string;
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(
      (params) => {
        this.getEvent();
      }
    )
  }

  getEvent() {
    let item = localStorage.getItem('selectedEvent');
    this.event = JSON.parse(item);
    if (this.event && this.event.Images && this.event.Images.length > 0) {
      this.selectedImg = this.event.Images[0].Image;
    }
  }

  onImageSelect(Image) {
    this.selectedImg = Image.Image;
  }
}
