import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'; //TODO <---
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CategoryService } from "src/app/shared/services/category.service";
import { loadCategories, loadedCategories } from './category.actions';

@Injectable()

export class CategoryEffects {

    loadItems$ = createEffect(() => this.actions$.pipe(
        ofType(loadCategories),
        mergeMap(() =>
            this.categoryService.get().pipe(
                map(categories => {
                    return loadedCategories({ categories: categories.data });
                }),
                catchError(error => EMPTY)
            )
        )))


    constructor(
        private actions$: Actions,
        private categoryService: CategoryService
    ) {

    }



}
