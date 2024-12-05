import { Component } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { UserService } from '../auth/services/user.service';
import { Product } from 'src/app/core/models/Product';
import { Wishlist } from 'src/app/core/models/Wishlist';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

  public pageIndex: number = 0
  public pLength: number = 0

  public showStutus: boolean = false
  public emptyCart: boolean = false
  public products: Product[] = []

  constructor(
    private _wishServise: WishlistService,
    private _userService: UserService
  ) {
    _wishServise.get(_userService.getLocalToken()).subscribe({
      next: (r: any) => {
        if (parseInt(r.status) == 200) {

          r.data.forEach((data: Wishlist) => {
            this.products.push(data.products ?? {})
          });

          this.pLength = r.count

          if (this.products.length < this.pLength) {
            this.showStutus = true
          } else {
            this.showStutus = false
          }


          if (this.products.length <= 0) {
            this.emptyCart = true
          }


        } else if (parseInt(r.status) == 401) {
          this._userService.closeSesion()
        } else {
          this.showStutus = false
        }
      }
    })
  }

  showMore() {
    if (this.products.length < this.pLength) {
      this.pageIndex++;
      this._wishServise.get(this._userService.getLocalToken(), this.pageIndex).subscribe({
        next: (r: any) => {
          if (parseInt(r.status) == 200) {
            r.data.forEach((data: Wishlist) => {
              this.products.push(data.products ?? {})
            })
            if (this.products.length < this.pLength) {
              this.showStutus = true
            } else {
              this.showStutus = false
            }
          } else if (parseInt(r.status) == 401) {
            this._userService.closeSesion()
          }
        }
      })
    } else {
      this.showStutus = false
    }
  }

}
