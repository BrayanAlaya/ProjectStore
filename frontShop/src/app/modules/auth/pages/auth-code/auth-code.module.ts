import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthCodeRoutingModule } from './auth-code-routing.module';
import { AuthCodeComponent } from './auth-code.component';
import { NavbarModule } from '../../components/navbar/navbar.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AuthCodeComponent
  ],
  imports: [
    CommonModule,
    AuthCodeRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class AuthCodeModule { }
