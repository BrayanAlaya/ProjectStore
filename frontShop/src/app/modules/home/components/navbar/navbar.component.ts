import { Component, DoCheck, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { User } from 'src/app/core/models/User';
import { CategoryService } from 'src/app/shared/services/category.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/states/app.state';
import { selectCategories } from 'src/app/states/category/category.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements DoCheck, OnInit {

  public slide: boolean = false;
  public user!: User | null;
  public srcImage: String = "assets/userUnknow.jpg"
  public s3Url: string = environment.s3url

  public categories$: Observable<any> = new Observable()
  public searchInputValue: string = ""

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _store: Store<AppState>,
    private _route: Router
  ) {

  }

  search(): void {

    if (this.searchInputValue != "") {
      this._route.navigate(["/products"], {
        queryParams: {
          name: this.searchInputValue
        }
      })
    }

  }

  ngOnInit(): void {

    this.categories$ = this._store.select(selectCategories)

  }

  ngDoCheck(): void {
    this.user = this._userService.getLocalUSer();
    if (this.user?.image != null) {
      this.srcImage = this.s3Url + this.user?.image
    } else {
      this.srcImage = "../../../../../assets/userUnknow.jpg"
    }
  }

  logOut(): void {
    this._userService.closeSesion("Has Cerrado sesion!")
  }

}
