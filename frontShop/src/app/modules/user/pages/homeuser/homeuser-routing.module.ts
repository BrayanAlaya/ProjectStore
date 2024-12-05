import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeuserComponent } from './homeuser.component';

const routes: Routes = [
  { path: "", component: HomeuserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeuserRoutingModule { }
