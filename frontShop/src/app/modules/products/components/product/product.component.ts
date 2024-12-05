import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/core/models/Cart';
import { Product } from 'src/app/core/models/Product';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { CartService } from 'src/app/modules/purchases/services/cart/cart.service';
import { environment } from 'src/environments/environment';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product!: Product

  public s3Url: string
  public image!: string
  public rating = 0;
  public hovered = 0;
  public stars = Array(5).fill(0);
  public horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private _userService: UserService,
    private _cartService: CartService,
    private _snackBar: MatSnackBar,
    private _r: Router
  ) {
    this.s3Url = environment.s3url
  }

  ngOnInit(): void {

    this.rating = Math.floor(Math.random() * (5 - 2 + 1)) + 2

    if (this.product.image != '[]') {
      this.image = this.s3Url + JSON.parse(this.product.image == undefined ? "" : this.product.image.toString())[0]
    } else {
      this.image = "../../../../../assets/imageNotFound.png"
    }

  }


  rate(star: number) {
    this.rating = star;
  }

  hover(star: number) {
    this.hovered = star;
  }

  addCart(): void {

    if (this._userService.getLocalToken() && this._userService.getLocalUSer()) {

      if (this._userService.getLocalUSer()?.auth != 1) {
        this._r.navigate(["/auth/auth_code/account"])
        return
      } 
  
    } else {
      this._r.navigate(['/auth/login']);
      return
    }

    const data: Cart = {
      amount: 1,
      product_id: this.product.id
    }

    this._cartService.save(data, this._userService.getLocalToken()).subscribe({
      next: (response: any) => {
        if (parseInt(response.status) == 200) {

          this._snackBar.open('Añadido!!', 'Ok', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });

        } else if (parseInt(response.status) == 401) {
          this._userService.closeSesion()
        } else {
          this._snackBar.open('Hubo un error!!', 'Ok', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }
    })
  }

  viewStock(stock: number | undefined): boolean {

    if (stock != undefined && stock > 0) {
      return true
    }

    return false
  }

}
