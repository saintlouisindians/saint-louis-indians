import { Component, OnInit } from '@angular/core';
import { AddsService } from '../../services/adds.service';
import { Add } from '../../models/add.model';
import { ModalPopUp } from '../../models/modalPopUp';


@Component({
  selector: 'app-myadds',
  templateUrl: './myadds.component.html',
  styleUrls: ['./myadds.component.less']
})
export class MyaddsComponent implements OnInit {

  adds: Add[];
  animationClass: string[] = [];
  modal: ModalPopUp;
  constructor(private addsSvc: AddsService) { }

  ngOnInit() {
    this.getMyAdds();
  }

  getMyAdds() {
    this.modal = {
      type: 'loading',
      operation: 'open',
      message: 'Something went wrong. Please try again later'
    }
    this.addsSvc.getAddsByUserID().subscribe(
      (resp) => {
        this.adds = resp;
        this.modal.operation = 'close';
      }
    );
  }

  deleteAdd(add) {
    this.modal.type = 'loading';
    this.addsSvc.deleteAdd(add).subscribe(
      (resp) => {
        this.animationClass[add.ID] = 'hinge';
        this.getMyAdds();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
