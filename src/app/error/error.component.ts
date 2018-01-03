import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {

  code:number;
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(
      (params) => {
        this.code = +params['code']
      }
    )
  }


}
