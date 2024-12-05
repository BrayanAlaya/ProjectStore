import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartProductModule } from '../../components/cart-product/cart-product.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BuyModalModule } from '../../components/buy-modal/buy-modal.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    CartProductModule,
    BuyModalModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  exports:[
    CartComponent
  ]
})
export class CartModule { }
