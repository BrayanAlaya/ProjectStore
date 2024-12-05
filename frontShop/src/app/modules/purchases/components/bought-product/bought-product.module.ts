import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoughtProductComponent } from './bought-product.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CapitalizePipeModule } from 'src/app/shared/pipes/capitalize-pipe/capitalize-pipe.module';


@NgModule({
  declarations: [
    BoughtProductComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    CapitalizePipeModule
  ],
  exports: [
    BoughtProductComponent
  ]
})
export class BoughtProductModule { }
