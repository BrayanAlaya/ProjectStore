import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesHitorialRoutingModule } from './sales-hitorial-routing.module';
import { SalesHitorialComponent } from './sales-hitorial.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    SalesHitorialComponent
  ],
  imports: [
    CommonModule,
    SalesHitorialRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule
  ], exports:[
    SalesHitorialComponent
  ]
})
export class SalesHitorialModule { }
