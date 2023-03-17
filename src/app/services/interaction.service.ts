import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductCardComponent } from '../components/product-card/product-card.component';

@Injectable({
  providedIn: 'root'
})
export class InteractionServiceService {

  constructor() { }

private _productCard = new Subject<string>();
productCard$ = this._productCard.asObservable();

sendProductCard(title : string){
  this._productCard.next(title);
}
}