import { Component } from '@angular/core';
import { IProductCard } from 'src/app/services/product-card';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
   /*
   * Property to hold search filter value
   */
    public filterValue: string = "";

    public applyFilter(filterValue: Event) {
      this.filterValue = (filterValue.target as HTMLInputElement).value;
    }
    public allProducts: IProductCard[] = [];

    products: IProductCard[]
    search(value: string): void {
      this.products = this.allProducts.filter((val) =>
        val.title.toLowerCase().includes(value)
      );
    }
}
