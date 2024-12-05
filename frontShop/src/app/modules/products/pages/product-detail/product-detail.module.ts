import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductDetailComponent } from './product-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { CapitalizePipeModule } from 'src/app/shared/pipes/capitalize-pipe/capitalize-pipe.module';
import { MatButtonModule } from '@angular/material/button';
import { ProductModule } from '../../components/product/product.module';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    MatIconModule,
    MatButtonModule,
    CapitalizePipeModule,
    MatInputModule,
    ProductModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  exports: [
    ProductDetailComponent,
  ]
})
export class ProductDetailModule { }
