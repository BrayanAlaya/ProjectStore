import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './states/app.state';

import { loadCategories } from './states/category/category.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(
    private _store: Store<AppState>
  ) {

  }

  ngOnInit(): void {

    this._store.dispatch(loadCategories());




  }

}
