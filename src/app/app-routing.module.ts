import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path: '', component: ItemsComponent },
  {path: 'items', component: ItemsComponent, canActivate: [AuthGuard] },
 // {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  {path: 'item/:id', component: ItemFormComponent },
  {path: 'new_item', component: ItemFormComponent, canActivate: [AuthGuard] },
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
