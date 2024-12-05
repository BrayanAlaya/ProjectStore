import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjustesComponent } from './ajustes.component';

const routes: Routes = [
  {path: "", component: AjustesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjustesRoutingModule { }
