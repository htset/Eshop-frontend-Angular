import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_helpers/auth.guard';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminItemFormComponent } from './admin-item-form/admin-item-form.component';
import { AdminItemsComponent } from './admin-items/admin-items.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { UserDetailComponent } from './user-detail/user-detail.component';


const routes: Routes = [
  {
    path : 'admin',
    component: AdminComponent,
    children: [
      { path: '',  component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'users', component: AdminUsersComponent, canActivate: [AuthGuard] },  
      { path: 'items', component: AdminItemsComponent, canActivate: [AuthGuard] },  
      { path: 'item/:id', component: AdminItemFormComponent, canActivate: [AuthGuard]  },    
      { path: 'new_item', component: AdminItemFormComponent, canActivate: [AuthGuard]  },    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
