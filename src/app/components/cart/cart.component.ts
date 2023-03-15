import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { addProduct, clearCart, removeProduct } from 'src/app/store/actions';
import { ProductGroup, selectGroupedCartEntries } from 'src/app/store/selectors';
import { selectCountProducts } from 'src/app/store/selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  countProducts$: Observable<number>;
  cartEntries$: Observable<ProductGroup[]>

  constructor(private store: Store, private routes:Router) {
    this.cartEntries$ = store.select(selectGroupedCartEntries);
    this.countProducts$ = store.select(selectCountProducts);
  }


  ngOnInit(): void {
  }
  
  clearStorage(){
    sessionStorage.clear()
    localStorage.clear()
    this.routes.navigate(['/home']);
    this.clearEntries()
  }

  clearEntries() {
    this.store.dispatch(clearCart());
    console.log(this.countProducts$)
  }
  
  less(entry: ProductGroup) {
    this.store.dispatch(removeProduct(entry.product));
  }
}