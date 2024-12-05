import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FooterModule } from "./components/footer/footer.module";
import { NavbarModule } from './components/navbar/navbar.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarModule,
    FooterModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
