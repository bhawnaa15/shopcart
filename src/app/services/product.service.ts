import { Injectable, OnInit} from '@angular/core';
import { IProductCard } from 'src/app/services/product-card';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit{
  public allProducts: IProductCard[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.fetchProducts()
  }
  fetchProducts() {
    this.http.get('https://fakestoreapi.com/products')
      .pipe(map((product) => {
        const products: any[] = [];
        for (const key in product) {
          products.push({ ...product[key], id: key, isLiked: false })
        }
        return products;
      }))
  }
}
