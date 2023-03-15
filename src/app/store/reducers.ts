import { IProductCard } from 'src/app/services/product-card';
import { createReducer, on, ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { addProduct, clearCart, removeProduct } from './actions';

export const intialCartEntries: IProductCard[] = [];

export const cartReducer = createReducer(
  intialCartEntries,

  on(clearCart, _ => [] ),

  on(addProduct, (entries, product) => {
    const entriesClone: IProductCard[] = JSON.parse(JSON.stringify(entries));
    entriesClone.push(product);
    return entriesClone;
  }),

  on(removeProduct, (entries, product) => {
    const entriesClone: IProductCard[] = JSON.parse(JSON.stringify(entries));
    const found = entriesClone.find(e => e.id == product.id);
    if (found) {
        entriesClone.splice(entriesClone.indexOf(found), 1)
    }
    return entriesClone;
  })
)

export const metaReducerLocalStorage = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    if (action.type === INIT || action.type == UPDATE) {
      const storageValue = localStorage.getItem("state");
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem("state");
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem("state", JSON.stringify(nextState));
    return nextState;
  };
};