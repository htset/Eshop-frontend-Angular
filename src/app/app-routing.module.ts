import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './workflow/items/items.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './workflow/cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { ItemDetailsComponent } from './workflow/item-details/item-details.component';
import { CheckoutComponent } from './workflow/checkout/checkout.component';
import { PaymentComponent } from './workflow/payment/payment.component';
import { SummaryComponent } from './workflow/summary/summary.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: ItemsComponent },
  {path: 'items', component: ItemsComponent },
  {path: 'item/:id', component: ItemDetailsComponent },
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent}, 
  {path: 'registration', component: RegistrationComponent},  
  {path: 'checkout', component: CheckoutComponent},  
  {path: 'payment', component: PaymentComponent},  
  {path: 'summary', component: SummaryComponent},  
  {path: '404', component: NotFoundComponent}, 
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
