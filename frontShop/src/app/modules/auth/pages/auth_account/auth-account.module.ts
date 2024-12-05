import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthAccountComponent } from './auth-account.component';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { AuthAccountRoutingModule } from './auth-account-routing.module';

@NgModule({
  declarations: [
    AuthAccountComponent
  ],
  imports: [
    CommonModule,
    AuthAccountRoutingModule,
  ]
})
export class AuthAccountModule { }
