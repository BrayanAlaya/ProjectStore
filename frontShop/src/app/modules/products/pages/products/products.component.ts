import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { find, map, Observable, of } from 'rxjs';
import { Product } from 'src/app/core/models/Product';
import { AppState } from 'src/app/states/app.state';
import { selectCategories } from 'src/app/states/category/category.selectors';
import { loadProducts } from 'src/app/states/products/products.actions';
import { products, selectProducts } from 'src/app/states/products/products.selector';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public nameQuery: string = ""
  public categoryQuery: string = ""

  public searchTitle$: Observable<any> = new Observable<any>
  public categoryTitle$: Observable<any> = new Observable<any>

  public categories$: Observable<any> = new Observable<any>
  public products: Array<Product> = []

  public pageIndex: number = 0
  public pLength: number = 0

  public showStutus: boolean = false
  public emptyStatus: boolean = false

  constructor(
    private _routeA: ActivatedRoute,
    private _store: Store<AppState>,
    private _route: Router
  ) {
    this.categories$ = this._store.select(selectCategories)

    this._routeA.queryParamMap.subscribe({
      next: (response: any) => {
        this.nameQuery = response.params.name
        this.categoryQuery = response.params.category
        this.products = []
        this.pageIndex = 0
        this.searchTitle$ = of(this.nameQuery);
        this.categoryTitle$ = this.categories$.pipe(
          map(categories => categories.categories?.find((category: any) => category.id == parseInt(this.categoryQuery))?.name)
        );
        this._store.dispatch(loadProducts({ name: this.nameQuery, page: 0, user: "", category: this.categoryQuery, id: "" }))
      }
    })
    this._store.select(selectProducts).subscribe({
      next: (r: any) => {
        if (parseInt(r.status) == 200) {
          this.pLength = parseInt(r.count)

          r.products.forEach((data: Product) => {
            this.products.push(data)
          })

          if (this.pLength <= 0) {
            this.emptyStatus = true
          } else{
            this.emptyStatus = false
          }

          if (this.products.length >= this.pLength) {
            this.showStutus = false
          } else {
            this.showStutus = true
          }
        } else {
          this.showStutus = false
        }
      }
    })
  }

  getCurrentCategory(id: string | number | undefined): boolean{
    try {
      if (id == parseInt(this.categoryQuery)) {
        return true
      } else{
        return false
      }
    } catch (error) {
      return false
    }
  }

  setCategory(categoryId: any) {
    this._route.navigate([], {
      queryParams: { "category": categoryId },
      queryParamsHandling: 'merge', // Mantiene los otros query params
    });
  }

  showMore() {
    if (this.products.length < this.pLength) {
      this.pageIndex++;
      this._store.dispatch(loadProducts({ name: this.nameQuery, page: this.pageIndex, user: "", category: this.categoryQuery, id: "" }))

    } else {
      this.showStutus = false
    }
  }

}
