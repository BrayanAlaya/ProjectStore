import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmLogComponent } from './confirm-log.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ConfirmLogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    ConfirmLogComponent
  ]
})
export class ConfirmLogModule { }
