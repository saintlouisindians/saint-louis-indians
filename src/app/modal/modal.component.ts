import { Component, OnInit, Input } from '@angular/core';
import { ModalPopUp } from '../models/modalPopUp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {
  @Input() modelPopup: ModalPopUp
  constructor(private router: Router) { }

  ngOnInit() {
  }

  closeModal() {
    if (this.modelPopup.returnUrl) {
      this.router.navigate(['login']);
    }
    this.modelPopup.operation = 'close';
  }
}
