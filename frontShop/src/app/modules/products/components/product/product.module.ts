import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CapitalizePipeModule } from 'src/app/shared/pipes/capitalize-pipe/capitalize-pipe.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    CapitalizePipeModule,
    MatSnackBarModule
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductModule { }
