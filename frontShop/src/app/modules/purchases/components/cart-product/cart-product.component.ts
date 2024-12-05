import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cart } from 'src/app/core/models/Cart';
import { environment } from 'src/environments/environment';
import { CartService } from '../../services/cart/cart.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { ConfirmLogComponent } from 'src/app/modules/products/components/confirm-log/confirm-log.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/states/app.state';
import { loadCart } from 'src/app/states/cart/cart.actions';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent {

  @Input() cart!: Cart

  public s3Url: string
  public image!: string 

  constructor(
    public dialog: MatDialog,
    private _cartService: CartService,
    private _userService: UserService,
    private _store: Store<AppState>
  ){
    this.s3Url = environment.s3url
  }
  
  ngOnInit(): void {
    this.image = JSON.parse(this.cart.products?.image == undefined ? "" : this.cart.products?.image.toString())[0]
  }

  add(): void{

    const pCart:Cart = {
      product_id: this.cart.products?.id,
      amount: 1
    } 

    this._cartService.save(pCart, this._userService.getLocalToken()).subscribe({
      next: (r) => {
        if (parseInt(r.status) == 200) {
          this._store.dispatch(loadCart({token: this._userService.getLocalToken()?.toString() ?? ""}))
        }
      }
    })
  }
  substract(): void{
    const pCart:Cart = {
      product_id: this.cart.products?.id,
      amount: -1
    } 

    this._cartService.save(pCart, this._userService.getLocalToken()).subscribe({
      next: (r) => {
        if (parseInt(r.status) == 200) {
          this._store.dispatch(loadCart({token: this._userService.getLocalToken()?.toString() ?? ""}))
        }
      }
    })
  }

  delete(): void{
    const dialogRef = this.dialog.open(ConfirmLogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this._cartService.delete(this.cart.id ?? "", this._userService.getLocalToken()).subscribe({
          next: (response: any) => {
            if (parseInt(response.status) == 200) {
              this._store.dispatch(loadCart({token: this._userService.getLocalToken()?.toString() ?? ""}))
            }
          }
        })
      }
    });
  }

}
