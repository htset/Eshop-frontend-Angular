import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { UserDetailComponent } from './user-detail/user-detail.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from '@app/_helpers/error.interceptor';
import { AdminItemsComponent } from './admin-items/admin-items.component';
import { AdminItemFormComponent } from './admin-item-form/admin-item-form.component';
import { FilterComponent } from '@app/shared/filter/filter.component';
import { SharedModule } from '@app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminUsersComponent } from './admin-users/admin-users.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
//    UserDetailComponent,
    AdminHomeComponent,
    AdminItemsComponent,
    AdminItemFormComponent,
    AdminUsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    AdminRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
//    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],

})
export class AdminModule { }
