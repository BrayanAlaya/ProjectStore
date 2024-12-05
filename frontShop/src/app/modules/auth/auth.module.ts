import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { LoginModule } from './pages/login/login.module';
import { NavbarModule } from "./components/navbar/navbar.module";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NavbarModule
]
})
export class AuthModule { }
