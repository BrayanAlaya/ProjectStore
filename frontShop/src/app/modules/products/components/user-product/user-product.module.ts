import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProductComponent } from './user-product.component';

import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmLogModule } from '../confirm-log/confirm-log.module';

@NgModule({
  declarations: [
    UserProductComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ConfirmLogModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    UserProductComponent
  ]
})
export class UserProductModule { }
