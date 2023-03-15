import { IProductCard } from 'src/app/services/product-card';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductGroup {
  product: IProductCard;
  count: number;
}

export const selectCountProducts = createSelector(
  createFeatureSelector('cartEntries'),
  (state: IProductCard[]) => {
    return state.length;
  }
);


export const selectTotalPrice = createSelector(
  createFeatureSelector('cartEntries'),
  (state: IProductCard[]) => {
    var totalPrice = 0;
    state.forEach(p => totalPrice += p.price);
    return totalPrice;
  }
)

export const selectGroupedCartEntries = createSelector(
  createFeatureSelector('cartEntries'),
  (state: IProductCard[]) => {
    var map: Map<number, ProductGroup> = new Map;

    state.forEach(p => {
      if (map.get(p.id)) {
        (map.get(p.id) as ProductGroup).count++;
      } else {
        map.set(p.id, { product: p, count: 1 });
      }
    })

    const sortedMap = new Map([...map.entries()].sort());
    return Array.from(sortedMap.values());
  }
)