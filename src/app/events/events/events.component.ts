import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.less']
})
export class EventsComponent implements OnInit {

  events: any[];
  constructor(private eventsSvc: EventsService) { }

  ngOnInit() {
    this.getNext30Events();
  }

  getNext30Events() {
    let today = new Date();
    let thirtyDay = new Date();
    thirtyDay.setDate(today.getDay() + 30);
    this.eventsSvc.getEvents(today, thirtyDay).subscribe(
      (resp) => {
        this.events = resp
      }
    )
  }
}
