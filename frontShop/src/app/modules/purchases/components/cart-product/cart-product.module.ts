import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProductComponent } from './cart-product.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CapitalizePipeModule } from 'src/app/shared/pipes/capitalize-pipe/capitalize-pipe.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    CartProductComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    CapitalizePipeModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports:[
    CartProductComponent
  ]
})
export class CartProductModule { }
