import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { ModalPopUp } from '../models/modalPopUp';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.less']
})
export class NavigationComponent implements OnInit {
    navWidth = '0px';
    modal: ModalPopUp;
    currentUrl: any;
    closeNav = function () {
        this.navWidth = '0px';
    }

    openNav = function () {
        this.navWidth = '70%';
    }
    navigationData: any;
    IsLoggedIn = true;
    smallNavData: any[];
    constructor(private navigationSvc: NavigationService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.modal = {
            type: 'loading',
            operation: 'open',
            message: 'success'
        }
        this.getsmallNavData();
        this.getNavigationData();
        this.currentUrl = window.location.href;
        this.smallNavData.forEach(
            (element) => {
                if (this.currentUrl.toUpperCase().endsWith(element.link.toUpperCase())) {
                    element.active = true;
                } else {
                    element.active = false;
                }
            }
        )

    }

    getNavigationData() {
        this.navigationSvc.getNavigationData().subscribe(
            (resp) => {
                this.navigationData = resp;
                this.modal.operation = 'close';
                localStorage.setItem('navigationData', JSON.stringify(resp));
            }
        )
    }

    getsmallNavData() {
        this.smallNavData = [
            { text: 'Movies', link: 'movies', active: true },
            { text: 'Manage My Adds', link: 'myadds', active: false },
            { text: 'Post An Add', link: 'postadd', active: false },
            { text: 'Add Business', link: 'add-business', active: false },
            { text: 'Events', link: 'events', active: false }

        ];
    }

    onSmallNavClick(nav) {
        this.smallNavData.forEach(
            (element) => {
                if (element.text === nav.text) {
                    element.active = true;
                } else {
                    element.active = false;
                }
            }
        )
        this.router.navigate([nav.link]);
    }
}