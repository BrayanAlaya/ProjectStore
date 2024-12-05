import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'; //TODO <---
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { loadedProducts, loadProducts } from './products.actions';
import { ProductsService } from 'src/app/modules/products/services/products.service';

@Injectable()

export class ProductsEffects {

    loadItems$ = createEffect(() => this.actions$.pipe(
        ofType(loadProducts),
        mergeMap(params =>
            this.productService.get(params.name, params.page, params.user, params.category, params.id).pipe(
                map(products => {
                    return loadedProducts({status: products.status, products: products.data, count: products.count});
                }),
                catchError(error => EMPTY)
            )
        )))


    constructor(
        private actions$: Actions,
        private productService: ProductsService
    ) {

    }



}
