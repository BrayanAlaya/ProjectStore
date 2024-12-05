import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SidevarModule } from './components/sidevar/sidevar.module';


@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SidevarModule
  ]
})
export class UserModule { }
