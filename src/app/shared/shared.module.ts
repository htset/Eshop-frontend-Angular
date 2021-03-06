import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '@app/shared/filter/filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ FilterComponent]
})
export class SharedModule { }

