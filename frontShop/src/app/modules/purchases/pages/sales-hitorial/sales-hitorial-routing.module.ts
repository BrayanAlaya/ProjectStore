import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesHitorialComponent } from './sales-hitorial.component';

const routes: Routes = [
  {path: "", component: SalesHitorialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesHitorialRoutingModule { }
