import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenderRoutingModule } from './vender-routing.module';
import { VenderComponent } from './vender.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    VenderComponent
  ],
  imports: [
    CommonModule,
    VenderRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    VenderComponent
  ]
})
export class VenderModule { }
