import { Component, OnInit, Output, SimpleChanges, OnChanges, SimpleChange } from '@angular/core';
import { AddsService } from '../../services/adds.service';
import { Add } from '../../models/add.model';
import { ModalPopUp } from '../../models/modalPopUp';


@Component({
  selector: 'app-myadds',
  templateUrl: './myadds.component.html',
  styleUrls: ['./myadds.component.less']
})
export class MyaddsComponent implements OnInit, OnChanges {

  adds: Add[];
  animationClass: string[] = [];
  modal: ModalPopUp;
  selectedAdd: Add;
  changed: boolean;
  @Output() refreshAdds: boolean;
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

  onModifyAddClick(add: Add) {
    this.changed ? this.changed = false : this.changed = true;
    this.selectedAdd = add;
  }

  ngOnChanges(changes: SimpleChanges) {
    debugger;
    console.log(this.refreshAdds);
  }
}
