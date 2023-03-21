import { Component, OnInit, Input } from '@angular/core';
import { IProductCard } from 'src/app/services/product-card';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { addProduct } from 'src/app/store/actions';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {InteractionServiceService} from '../../services/interaction.service' 

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})


export class ProductCardComponent implements OnInit {

  @Input() validStates: any;

  public allProducts: IProductCard[] = [];

  /**
  * Property to apply search filter in table
  */
  @Input() public searchText = '';

  constructor(private http: HttpClient, private store: Store, private routes:Router, private _interactionService : InteractionServiceService) {
  }

  ngOnInit() {
    this.fetchProducts()
    this._interactionService.productCard$.subscribe(
      item => {
        this.searchText=item;
      }
    );
  }
  onCardDisplay(){
    this.routes.navigate(['/product-detail']);
  }

  private selectItemAlert(message: any) {
    Swal.fire({
      position: 'top-end',
      html: message,
      timer: 2000,
      width: '500px',
      showConfirmButton: false,
      timerProgressBar: false,
    });
  }
  private itemAddedAlert(message: any) {
    Swal.fire({
      position: 'top-end',
      html: message,
      timer: 800,
      width: '300px',
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }

  cartStatus:string="";
  viewCart(product:IProductCard) {
    this.cartStatus=sessionStorage.getItem('login');
      if(this.cartStatus === "true"){
        this.store.dispatch(addProduct(product));
        this.itemAddedAlert("Item Added");
      }
      else{
        this.selectItemAlert("Please Login first");
      }
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
