import { Component, Input, OnInit } from '@angular/core';
import { Purchases } from 'src/app/core/models/Purchases';
import { PurchaseService } from '../../services/purchase/purchase.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { PurchaseDetail } from 'src/app/core/models/PurchaseDetail';

@Component({
  selector: 'app-bought-product',
  templateUrl: './bought-product.component.html',
  styleUrls: ['./bought-product.component.scss']
})
export class BoughtProductComponent implements OnInit {

  @Input() purchase: Purchases = {}

  public purchaseDetail: Array<PurchaseDetail> = []

  constructor(
    private _purchaseService: PurchaseService,
    private _userService: UserService
  ) {

  }
  opened() {

    if (this.purchaseDetail.length <= 0) {
      this._purchaseService.getDetail(this.purchase.id, this._userService.getLocalToken()).subscribe({
        next: (r: any) => {
          if (parseInt(r.status) == 200) {
            this.purchaseDetail = r.data
          }
        }
      })
    }
  }

  ngOnInit(): void {
  }
}
