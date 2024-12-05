import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListProductsRoutingModule } from './user-list-products-routing.module';
import { UserListProductsComponent } from './user-list-products.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserProductModule } from '../../components/user-product/user-product.module';
import { MatIconModule } from '@angular/material/icon';

import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    UserListProductsComponent
  ],
  imports: [
    CommonModule,
    UserListProductsRoutingModule,
    MatPaginatorModule,
    UserProductModule,
    MatIconModule,
    MatSelectModule,
  ],
  exports: [
    UserListProductsComponent
  ]
})
export class UserListProductsModule { }
