import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenderComponent } from './vender.component';

const routes: Routes = [
  {path: "", component: VenderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenderRoutingModule {
  
}
