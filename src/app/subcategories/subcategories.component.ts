import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.less']
})
export class SubcategoriesComponent implements OnInit {

  categoryName: string;
  subCategories: any[]=[];
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(
      params => {
        let id = +params['id'];
        this.categoryName=params['name'];
        this.getSubCategories(id);
      }
    )
  }

  getSubCategories(id: number) {
    let cats = JSON.parse(localStorage.getItem('navigationData')).Categories;
    cats[id-1].SubCategories.forEach(element => {
      this.subCategories.push({ Name: element.Name, ID: element.ID })
    });
  }

}
