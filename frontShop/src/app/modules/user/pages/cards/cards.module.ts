import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './cards.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    MatIconModule,
    MatButtonModule
  ],exports: [
    CardsComponent
  ]
})
export class CardsModule { }
