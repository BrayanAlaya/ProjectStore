import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoughtHistorialRoutingModule } from './bought-historial-routing.module';
import { BoughtHistorialComponent } from './bought-historial.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BoughtProductModule } from '../../components/bought-product/bought-product.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    BoughtHistorialComponent
  ],
  imports: [
    CommonModule,
    BoughtHistorialRoutingModule,
    MatIconModule,
    BoughtProductModule,
    MatButtonModule
  ],
  exports: [
    BoughtHistorialComponent
  ]
})
export class BoughtHistorialModule { }
