import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PurchaseService } from '../../services/purchase/purchase.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { Purchases } from 'src/app/core/models/Purchases';

@Component({
  selector: 'app-bought-historial',
  templateUrl: './bought-historial.component.html',
  styleUrls: ['./bought-historial.component.scss']
})
export class BoughtHistorialComponent implements OnInit {

  public pageIndex: number = 0
  public pLength: number = 0

  public showStutus: boolean = false

  public emptyCart: boolean = false

  public purchases: Array<Purchases> = []

  constructor(
    private _purchaseService: PurchaseService,
    private _userService: UserService
  ) {
    this._purchaseService.get(this._userService.getLocalToken()).subscribe({
      next: (r: any) => {
        if (parseInt(r.status) == 200) {
          this.pLength = parseInt(r.count)

          r.data.forEach((data: Purchases) => {
            this.purchases.push(data)
          })

          if (this.purchases.length <= 0) {
            this.emptyCart = true
          } else {
            this.emptyCart = false
          }

          if (this.purchases.length >= this.pLength) {
            this.showStutus = false
          } else {
            this.showStutus = true
          }
        } else if (parseInt(r.status) == 401) {
          this._userService.closeSesion()
        } else {
          this.showStutus = false
        }
      }
    })
  }


  ngOnInit(): void {

  }

  showMore() {
    if (this.purchases.length < this.pLength) {
      this.pageIndex++;
      this._purchaseService.get(this._userService.getLocalToken(), this.pageIndex).subscribe({
        next: (r: any) => {
          if (parseInt(r.status) == 200) {
            r.data.forEach((data: Purchases) => {
              this.purchases.push(data)
            })
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
