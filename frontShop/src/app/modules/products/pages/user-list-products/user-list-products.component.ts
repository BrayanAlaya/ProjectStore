import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/core/models/Product';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { User } from 'src/app/core/models/User';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCategories } from 'src/app/states/category/category.selectors';
import { AppState } from 'src/app/states/app.state';
import { selectProducts } from 'src/app/states/products/products.selector';
import { loadProducts } from 'src/app/states/products/products.actions';
import { NotExpr } from '@angular/compiler';


@Component({
  selector: 'app-list-products',
  templateUrl: './user-list-products.component.html',
  styleUrls: ['./user-list-products.component.scss']
})
export class UserListProductsComponent implements OnInit {

  public length$: Observable<any> = new Observable<any>;
  public pageSize = 12;
  public pageIndex = 0;
  public pageEvent!: PageEvent;

  public categories$: Observable<any> = new Observable()

  public category!: string
  public search!: string

  private user: User | null
  public products$: Observable<any> = new Observable<any>
  public loading$: Observable<any> = new Observable<any>

  constructor(
    private _userService: UserService,
    private _store: Store<AppState>,

  ) {
    this.user = _userService.getLocalUSer()
    this._store.dispatch(loadProducts({ name: "", page: 0, user: this.user?.id, category: "", id: "" }))
    this._store.select(selectProducts).subscribe({
      next: (response: any) => {
        if (parseInt(response.status) == 401) {
          this._userService.closeSesion()
          return
        }
      }
    })
    this.products$ = this._store.select(selectProducts)
    this.length$ = this._store.select(selectProducts)
    this.loading$ = this._store.select(selectProducts)
  }

  ngOnInit(): void {
    this.categories$ = this._store.select(selectCategories)
  }

  onSearchInput(name: string): void {
    this.search = name.toLowerCase();
    this._store.dispatch(loadProducts({ name: this.search, page: this.pageIndex, user: this.user?.id, category: this.category, id: "" }))
  }

  onSelectionChange(event: any): void {
    this.category = event.value;
    this._store.dispatch(loadProducts({ name: this.search, page: this.pageIndex, user: this.user?.id, category: this.category, id: "" }))

  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this._store.dispatch(loadProducts({ name: this.search, page: this.pageIndex, user: this.user?.id, category: this.category, id: "" }))
  }

}
