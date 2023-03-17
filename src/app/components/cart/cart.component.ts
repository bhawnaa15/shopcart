import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { clearCart, removeProduct } from 'src/app/store/actions';
import { ProductGroup, selectGroupedCartEntries } from 'src/app/store/selectors';
import { selectCountProducts } from 'src/app/store/selectors';
import { Router } from '@angular/router';
import { addProduct } from 'src/app/store/actions';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { IProductCard } from 'src/app/services/product-card';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  /**
   * Property to hold the number of products moving to cart
   */
  public countProducts: Observable<number>;

  /**
   * Property to hold the entries of the cart
   */
  public cartEntries: Observable<ProductGroup[]>
  
  /**
   * Properties to store the prices of products
   */
  public newSum: any[] = []
  public total: number[] = []
  newCount:number[]=[]

  /**
   * Property to store the total price
   */
  public grandTotal:number

  /**
   * Property to store the quantity of products
   */
  public quantity = 1;
  public count;

  /**
   * Property to store the status of cart
   */
  public cartStatus: string = "";

  constructor(private store: Store, private routes: Router) {
    this.cartEntries = store.select(selectGroupedCartEntries);
    this.countProducts = store.select(selectCountProducts);
  }
  
  
  ngOnInit(): void {
    this.cartEntries.subscribe((item) => item.forEach((element => {
      this.total.push(element.product.price);
      this.count=element.count
      console.log(this.count)
    })))
    this.totalSum()
  }

  /**
   * Method to calculate the total sum of products
   */
  public totalSum() {
    const initialValue = 0;
    this.newSum = this.total.map(x => (x + (x * 0.18 ))* this.count)
    this.grandTotal = this.newSum.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)
  }
  
  /**
   * Method to add items to cart
   */
  public addItem(product: IProductCard) {
    this.cartStatus = sessionStorage.getItem('login');
    if (this.cartStatus === "true") {
      this.store.dispatch(addProduct(product));
      this.itemAddedAlert("Item Added");
      window.location.reload();
    }
  }

  /**
   * Method to clear the session storage when user logs out
   */
  public clearStorage() {
    sessionStorage.clear()
    localStorage.clear()
    this.routes.navigate(['/home']);
    this.clearEntries()
  }

  /**
   * Method to remove items from cart
   */
  public clearEntries() {
    this.store.dispatch(clearCart());
  }

  /**
   * Method to remove item from cart
   */
  public removeItem(entry: ProductGroup) {
    this.store.dispatch(removeProduct(entry.product));
    window.location.reload();
  }

  /**
   * Method to popup item added alert
   */
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
}