import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/Category';
import { CategoryState } from 'src/app/core/models/Category.state';
import { ProductState } from 'src/app/core/models/Product.state';
import { AppState } from 'src/app/states/app.state';
import { selectCategories } from 'src/app/states/category/category.selectors';
import { loadProducts } from 'src/app/states/products/products.actions';
import { selectProducts } from 'src/app/states/products/products.selector';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public imgBGHP: string = "../../../../../assets/bghp.webp"
  public hoveredIdCategory: Number | null = null;

  public categories$: Observable<CategoryState> = new Observable()
  public products$: Observable<ProductState> = new Observable()

  constructor(
    private _store: Store<AppState>
  ) {
    this._store.dispatch(loadProducts({ name: "", page: 0, user: "", category: "", id: "" }))
  }

  onHoverCategories(index: Number | undefined, state: boolean): void {
    if (index != undefined) {
      this.hoveredIdCategory = state ? index : null;
    }
  }

  
  ngOnInit(): void {

    this.categories$ = this._store.select(selectCategories)
    this.products$ = this._store.select(selectProducts)
    this._store.select(selectCategories).subscribe({
      next: (r : any) => {
        
      }
    })

  }

}
