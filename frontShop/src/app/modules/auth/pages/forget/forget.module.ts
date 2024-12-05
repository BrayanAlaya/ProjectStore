import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetRoutingModule } from './forget-routing.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { ForgetComponent } from './forget.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ForgetComponent
  ],
  imports: [
    CommonModule,
    ForgetRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ForgetModule { }
