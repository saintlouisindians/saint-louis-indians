import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Router } from '@angular/router';
import {NgxAutoScroll} from "ngx-auto-scroll";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.less']
})
export class EventsComponent implements OnInit {

   @ViewChild(NgxAutoScroll) ngxAutoScroll: NgxAutoScroll;
 
    public forceScrollDown(): void {
        this.ngxAutoScroll.forceScrollDown();
    }

  events: any[];
  constructor(private eventsSvc: EventsService, private router: Router) { }

  ngOnInit() {
    this.getNext30Events();
    //this.forceScrollDown();
  }

  getNext30Events() {
    let today = new Date();
    let thirtyDay = new Date();
    thirtyDay.setDate(today.getDay() + 30);
    this.eventsSvc.getEvents(today, thirtyDay).subscribe(
      (resp) => {
        this.events = resp
        console.log(resp);
      }
    )
  }

  onEventSelect(eve) {
    localStorage.setItem('selectedEvent', JSON.stringify(eve));
    window.scrollTo(0, 0);
    this.router.navigate(['event-detail/' + eve.ID]);
  }

  getDay(dateString: string) {
    return dateString.split(',')[0].split(' ')[1];
  }
  getMonth(dateString: string){
    return dateString.split(',')[0].split('')[0];
  }
}
