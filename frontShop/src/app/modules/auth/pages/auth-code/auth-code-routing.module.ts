import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCodeComponent } from "./auth-code.component"

const routes: Routes = [
  {path: ":action", component: AuthCodeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthCodeRoutingModule { }
