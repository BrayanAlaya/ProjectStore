import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PurchaseService } from '../../services/purchase/purchase.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { Store } from '@ngrx/store';
import { loadCart } from 'src/app/states/cart/cart.actions';
import { AppState } from 'src/app/states/app.state';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.scss']
})
export class BuyModalComponent {
  public creditCardNumber: string = '';
  public disable: boolean = true
  private disableButton: boolean = true

  public creditCart: string = "4789 4854 4878 4754"
  public mm: string = "05"
  public yy: string = "29"
  public cvc: string = "123"
  public nameCard: string = "Brayan Alaya"

  public statusMessage = ""
  public status !: boolean

  constructor(
    public dialogRef: MatDialogRef<BuyModalComponent>,
    private _purchaseService: PurchaseService,
    private _userService: UserService,
    private _store: Store<AppState>
  ) { }

  buy(): void {

    if (!this.disableButton) {
      return
    }

    this.disableButton = false

    this._purchaseService.save(this._userService.getLocalToken()).subscribe({
      next: (r: any) => {
        if (parseInt(r.status) == 200) {
          this.statusMessage = "Comprado Correctamente"
          this.status = true

          this._store.dispatch(loadCart({ token: this._userService.getLocalToken()?.toString() ?? "" }))

          setTimeout(() => {
            this.dialogRef.close()
          }, 2000);

        } else if (parseInt(r.status) == 401) {
          this._userService.closeSesion()
        } else {
          this.statusMessage = "Hubo un error"
          this.status = false
          this.disableButton = true
        }
      }
    })
  }

}


