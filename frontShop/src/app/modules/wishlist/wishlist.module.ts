import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist.component';
import { ProductModule } from '../products/components/product/product.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    ProductModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    WishlistComponent
  ]
})
export class WishlistModule { }
