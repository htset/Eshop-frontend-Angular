import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { ItemFormComponent } from './item-form/item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FilterComponent } from './filter/filter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailComponent,
    DashboardComponent,
    ItemFormComponent,
    UserDetailComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
//    HttpClientInMemoryWebApiModule.forRoot(
//      InMemoryDataService, { dataEncapsulation: false }
//    ),
    ReactiveFormsModule,
NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
