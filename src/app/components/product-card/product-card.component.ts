import { Component, OnInit } from '@angular/core';
import { IProductCard } from 'src/app/services/product-card';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})


export class ProductCardComponent implements OnInit {
  public allProducts: IProductCard[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchProducts()
  }


  public onLike(i: number) {
    this.allProducts[i].isLiked = !this.allProducts[i].isLiked;
  }


  private fetchProducts() {
    this.http.get('https://fakestoreapi.com/products')
      .pipe(map((product) => {
        const products: any[] = [];
        for (const key in product) {
          products.push({ ...product[key], id: key, isLiked: false })
        }
        return products;
      }))
      .subscribe((products) => {
        console.log(products);
        this.allProducts = products;
      })
  }
}
