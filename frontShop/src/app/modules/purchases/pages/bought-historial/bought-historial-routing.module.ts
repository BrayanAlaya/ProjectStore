import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoughtHistorialComponent } from './bought-historial.component';

const routes: Routes = [
  {path: "", component: BoughtHistorialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoughtHistorialRoutingModule { }
