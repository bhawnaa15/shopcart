import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { clearCart, removeProduct } from 'src/app/store/actions';
import { ProductGroup, selectGroupedCartEntries } from 'src/app/store/selectors';
import { selectCountProducts } from 'src/app/store/selectors';
import { Router } from '@angular/router';
import { addProduct } from 'src/app/store/actions';
import Swal from 'sweetalert2';
import { IProductCard } from 'src/app/services/product-card';

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
  quantity= 1;
  cartStatus:string="";
  addItem(product:IProductCard) {
    this.cartStatus=sessionStorage.getItem('login');
      if(this.cartStatus === "true"){
        
        this.store.dispatch(addProduct(product));
        this.itemAddedAlert("Item Added");
      }
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
  
  removeItem(entry: ProductGroup) {
    this.store.dispatch(removeProduct(entry.product));
  }

}