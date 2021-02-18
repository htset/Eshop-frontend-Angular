import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { ItemsComponent } from './workflow/items/items.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './_services/in-memory-data.service';
//import { ItemFormComponent } from './item-form/item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { UserDetailComponent } from './user-detail/user-detail.component';
import { FilterComponent } from './shared/filter/filter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
//import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { CartComponent } from './workflow/cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { ItemDetailsComponent } from './workflow/item-details/item-details.component';
import { LoadingDialogComponent } from './shared/loading-dialog/loading-dialog.component';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from './_helpers/global-error-handler';
import { CheckoutComponent } from './workflow/checkout/checkout.component';
import { DeliveryAddressComponent } from './shared/delivery-address/delivery-address.component';
import { PaymentComponent } from './workflow/payment/payment.component';
import { SummaryComponent } from './workflow/summary/summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { fakeBackendProvider } from './_helpers/fake-backend';
import { OverlayModule } from "@angular/cdk/overlay";

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
//    ItemFormComponent,
    LoginComponent,
    CartComponent,
    ProfileComponent,
    RegistrationComponent,
    ItemDetailsComponent,
    LoadingDialogComponent,
    ErrorDialogComponent,
    CheckoutComponent,
    DeliveryAddressComponent,
    PaymentComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
//    HttpClientInMemoryWebApiModule.forRoot(
//      InMemoryDataService, { dataEncapsulation: false }
//    ),
    ReactiveFormsModule,
    NgbModule,
    AdminModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { }
