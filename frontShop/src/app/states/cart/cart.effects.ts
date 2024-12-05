import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'; //TODO <---
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { loadCart, loadedCart } from './cart.actions';
import { CartService } from 'src/app/modules/purchases/services/cart/cart.service';

@Injectable()

export class CartEffects {

    loadItems$ = createEffect(() => this.actions$.pipe(
        ofType(loadCart),
        mergeMap((params) =>
            this.cartService.get(params.token).pipe(
                map(cart => {
                    return loadedCart({ status: cart.status ,cart: cart.data });
                }),
                catchError(error => EMPTY)
            )
        )))


    constructor(
        private actions$: Actions,
        private cartService: CartService
    ) {

    }



}
