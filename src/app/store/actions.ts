import { IProductCard } from 'src/app/services/product-card';
import { createAction, props } from '@ngrx/store';

export const addProduct = createAction('Add Product', props<IProductCard>());
export const removeProduct = createAction('Remove Product', props<IProductCard>());
export const clearCart = createAction('Clear Cart');
