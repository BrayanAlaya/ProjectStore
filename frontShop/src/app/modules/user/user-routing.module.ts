import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: "", component: UserComponent ,children: [
      {path: "", loadChildren: ()=> import("./pages/homeuser/homeuser.module").then(m => m.HomeuserModule)},
      {path: "ajustes", loadChildren: ()=> import("../auth/pages/ajustes/ajustes.module").then(m => m.AjustesModule)},
      {path: "sell", loadChildren: ()=> import("../products/pages/vender/vender.module").then(m => m.VenderModule)},
      {path: "products", loadChildren: ()=> import("../products/pages/user-list-products/user-list-products.module").then(m => m.UserListProductsModule)},
      {path: "bought", loadChildren: ()=> import("../purchases/pages/bought-historial/bought-historial.module").then(m => m.BoughtHistorialModule)},
      {path: "sales", loadChildren: ()=> import("../purchases/pages/sales-hitorial/sales-hitorial.module").then(m => m.SalesHitorialModule)},
      {path: "wishlist", loadChildren: ()=>  import("../wishlist/wishlist.module").then(m => m.WishlistModule)},
      {path: "notifications", loadChildren: ()=>  import("../notifications/notifications.module").then(m => m.NotificationsModule)},
      {path: "cards", loadChildren: ()=>  import("./pages/cards/cards.module").then(m => m.CardsModule)},
      {path: "**", redirectTo:"", pathMatch:"full"}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
