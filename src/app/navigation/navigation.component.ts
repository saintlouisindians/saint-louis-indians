import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import {ModalPopUp} from '../models/modalPopUp'

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.less']
})
export class NavigationComponent implements OnInit {
    navWidth = '0px';
    modal:ModalPopUp;
    closeNav = function () {
        this.navWidth = '0px';
    }

    openNav = function () {
        this.navWidth = '70%';
    }
    navigationData: any;
    IsLoggedIn = true;
    constructor(private navigationSvc: NavigationService) {
    }

    ngOnInit() {
        this.modal={
            type:'loading',
            operation:'open',
            message:'success'
        }
        this.getNavigationData();
    }

    getNavigationData() {
        this.navigationSvc.getNavigationData().subscribe(
            (resp) => {
                this.navigationData = resp;
                this.modal.operation='close';
                localStorage.setItem('navigationData',JSON.stringify(resp));
            }
        )
    }
    categories = [{
        Category: 'Category1',
        SubCategoriesList: [{
            ID: 1,
            SubCategory: 'Sub Cat 1'
        },
        {
            ID: 1,
            SubCategory: 'Sub Cat 2'
        },
        {
            ID: 1,
            SubCategory: 'Sub Cat 3'
        },
        {
            ID: 1,
            SubCategory: 'Sub Cat 4'
        }
        ]
    },
    {
        Category: 'Category2',
        SubCategoriesList: [{
            ID: 1,
            SubCategory: 'Sub Cat 1'
        },
        {
            ID: 1,
            SubCategory: 'Sub Cat 2'
        },
        {
            ID: 1,
            SubCategory: 'Sub Cat 3'
        },
        {
            ID: 1,
            SubCategory: 'Sub Cat 4'
        }
        ]
    },
    {
        Category: 'Category3',
        SubCategoriesList: [{
            ID: 1,
            SubCategory: 'Sub Cat 1'
        },
        {
            ID: 1,
            SubCategory: 'Sub Cat 2'
        },
        {
            ID: 1,
            SubCategory: 'Sub Cat 3'
        },
        {
            ID: 1,
            SubCategory: 'Sub Cat 4'
        }
        ]
    }
    ];
}