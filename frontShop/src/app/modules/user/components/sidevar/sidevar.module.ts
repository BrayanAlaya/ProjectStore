import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidevarComponent } from './sidevar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SidevarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    SidevarComponent
  ]
})
export class SidevarModule { }
