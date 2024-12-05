import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListProductsComponent } from './user-list-products.component';

const routes: Routes = [{
  path: "", component: UserListProductsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListProductsRoutingModule { }
