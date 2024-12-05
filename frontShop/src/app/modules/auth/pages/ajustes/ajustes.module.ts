import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjustesRoutingModule } from './ajustes-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjustesComponent } from './ajustes.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AjustesComponent
  ],
  imports: [
    CommonModule,
    AjustesRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule
  ]
})
export class AjustesModule { }
