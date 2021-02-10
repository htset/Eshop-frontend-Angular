import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { SummaryComponent } from './summary/summary.component';

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
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
