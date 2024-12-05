import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { userAuthGuard } from 'src/app/core/guards/user-auth.guard';

const routes: Routes = [
  {
    path: "", component: HomeComponent, children: [
      {path: "", loadChildren: () => import("./pages/main/main.module").then(m => m.MainModule)},
      {path: "user", canActivate:[userAuthGuard], loadChildren: () => import("../user/user.module").then(m => m.UserModule)},
      {path: "products", loadChildren: ()=> import("../products/pages/products/products.module").then(m => m.ProductsModule)},
      {path: "product", loadChildren: ()=> import("../products/pages/product-detail/product-detail.module").then(m => m.ProductDetailModule)},
      {path: "cart", canActivate:[userAuthGuard], loadChildren: ()=> import("../purchases/pages/cart/cart.module").then(m => m.CartModule)},
      {path: "help", loadChildren: ()=> import("./pages/help-page/help-page.module").then(m => m.HelpPageModule)}
    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
