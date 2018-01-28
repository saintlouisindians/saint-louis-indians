import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'app';
  hideSideEvents: boolean;
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe(
      (url) => {
        let link = location.href;
        if (link.toString().toLowerCase().endsWith('events')) {
          this.hideSideEvents = true;
        }
        else {
          this.hideSideEvents = false
        }
      }
    )
  }
}
