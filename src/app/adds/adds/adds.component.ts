import { Component, OnInit } from '@angular/core';
import { AddsService } from '../../services/adds.service';
import { Add } from '../../models/add.model';
import { ActivatedRoute } from '@angular/router';
import { ModalPopUp } from '../../models/modalPopUp';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.less']
})
export class AddsComponent implements OnInit {
  adds: Add[];
  modal: ModalPopUp;
  selectedAdd: any;
  changed: boolean;
  constructor(private addsSvc: AddsService, private router: ActivatedRoute) {
    this.hideme = {};
  }
  showImg: any = {};
  hideme = {};
  subCategoryName: string;
  ngOnInit() {
    this.modal = {
      type: 'loading',
      operation: 'open',
      message: 'success'
    }

    this.router.params.subscribe(
      params => {
        let id = +params['id'];
        this.subCategoryName = params['name']
        this.getAdds(id);
      }
    )

  }

  onaddSelect(add) {
    this.changed ? this.changed = false : this.changed = true;
    this.selectedAdd = add;
  }
  getAdds(id: number) {
    //var id = this.router.snapshot.paramMap.get('id');
    this.addsSvc.getAdds(id).subscribe(
      (resp: Add[]) => {
        this.adds = resp;
        this.modal.operation = 'close';
        console.log(resp);
      },
      (error) => {
        this.modal.type = 'error';
        this.modal.message = 'Something went wrong. Please try again'
      }
    )
  }
  showImgClick(add) {
    Object.keys(this.showImg).forEach(h => {
      this.showImg[h] = false;
    });
    this.showImg[add.ID] = true;
  }

}
