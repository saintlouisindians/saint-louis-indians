import { Component } from '@angular/core';

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.less']
})
export class NavigationComponent {
    navWidth = '0px';
    closeNav = function () {
        this.navWidth = '0px';
    }

    openNav = function () {
        this.navWidth = '70%';
    }

    IsLoggedIn=true;
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