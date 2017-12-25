import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.less']
})
export class QuickLinksComponent implements OnInit {

  navigationData: any;
  constructor(private navigationSvc: NavigationService) { }

  ngOnInit() {
    this.getNavigationData();
  }

      closeNav = function () {
        this.navWidth = '0px';
    }

    openNav = function () {
        this.navWidth = '70%';
    }
  getNavigationData() {
    this.navigationSvc.getNavigationData().subscribe(
      (resp) => {
        this.navigationData = resp;
        localStorage.setItem('navigationData', JSON.stringify(resp));
      }
    )
  }
}
