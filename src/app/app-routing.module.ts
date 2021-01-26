import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemFormComponent } from './item-form/item-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'items', component: ItemsComponent},
  {path: 'dashboard', component: DashboardComponent },
  {path: 'item/:id', component: ItemFormComponent},
  {path: 'new_item', component: ItemFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
