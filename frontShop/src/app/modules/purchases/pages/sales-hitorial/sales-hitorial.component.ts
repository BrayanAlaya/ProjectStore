import { Component } from '@angular/core';
import { PurchaseDetail } from 'src/app/core/models/PurchaseDetail';
import { PurchaseService } from '../../services/purchase/purchase.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { Purchases } from 'src/app/core/models/Purchases';

@Component({
  selector: 'app-sales-hitorial',
  templateUrl: './sales-hitorial.component.html',
  styleUrls: ['./sales-hitorial.component.scss']
})
export class SalesHitorialComponent {

  public purchases: PurchaseDetail[] = []
  public pLength: number = 0
  public showStutus: boolean = false
  public pageIndex: number = 0
  public emptyCart: boolean = false
  public displayedColumns: string[] = ['name', 'quantity', 'price', 'amount'];

  constructor(
    private _purchaseService: PurchaseService,
    private _userService: UserService
  ) {
    _purchaseService.getSales(_userService.getLocalToken()).subscribe({
      next: (r: any) => {

        if (parseInt(r.status) == 200) {
          this.pLength = parseInt(r.count)
          this.purchases = [...this.purchases, ...r.data]

          if (this.purchases.length >= this.pLength) {
            this.showStutus = false
          } else {
            this.showStutus = true
          }

          if (this.purchases.length <= 0) {
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
    if (this.purchases.length < this.pLength) {
      this.pageIndex++;
      this._purchaseService.getSales(this._userService.getLocalToken(), this.pageIndex).subscribe({
        next: (r: any) => {
          if (parseInt(r.status) == 200) {
            this.purchases = [...this.purchases, ...r.data]
            if (this.purchases.length >= this.pLength) {
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
