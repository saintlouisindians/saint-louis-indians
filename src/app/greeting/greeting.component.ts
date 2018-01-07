import { Component, OnInit } from '@angular/core';
import { GreetingService } from '../services/greeting.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent implements OnInit {

  clock: string;
  greeting: string;
  time: Date;
  constructor(private greetingSvc: GreetingService) { }

  ngOnInit() {
    let date = new Date();
    this.greeting = this.getGreeting(date.getHours());
    // this.clock = this.getClock(date.getHours(), date.getMinutes(), date.getSeconds());

    this.greetingSvc.getClock().subscribe(
      (resp) => {
        this.time = resp;
        this.clock = this.getClock(this.time);
      }
    )
  }

  getGreeting(hour: number): string {
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour <= 17) {
      return 'Good Afternoon';
    } else if (hour > 17 && hour <= 24) {
      return 'Good Evening';
    }
  }

  getClock(date: Date): string {
    return date.toLocaleTimeString();
  }
}
