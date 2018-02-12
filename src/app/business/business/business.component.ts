import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { Business } from '../../models/business.model';
import { ModalPopUp } from '../../models/modalPopUp';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.less']
})
export class BusinessComponent implements OnInit {

  BusinessSubCategory: string;
  businesses: Business[];
  modal: ModalPopUp;
  selectedBusiness: any;
  changed: boolean;
  constructor(private router: ActivatedRoute, private busSvc: BusinessService) { }

  ngOnInit() {
    this.router.params.subscribe(
      params => {
        let id = +params['id'];
        this.BusinessSubCategory = params['name'];
        this.getBusinesses(id);
      }
    )
  }

  getBusinesses(id: number) {
    this.busSvc.getBusinesses(id).subscribe(
      resp => {
        this.businesses = resp;
        //this.modal.operation = 'close';
      }
    )
  }

  onBusinessSelect(business) {
    this.changed ? this.changed = false : this.changed = true;
    this.selectedBusiness = business;
  }

}
