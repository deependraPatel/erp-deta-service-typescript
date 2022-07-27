import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from '../../material-modules';

import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { DataTableGridModule } from '../../data-table-grid/data-table-grid.module';
import { NewFormComponent, FormElementDialog } from './new-form/new-form.component';
import { FormsListComponent } from './forms-list/forms-list.component';


@NgModule({
  declarations: [
    FormsComponent,
    NewFormComponent,
    FormsListComponent,
    FormElementDialog
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsRoutingModule,
    DataTableGridModule,
    MaterialModules,
  ]
})
export class FormsModule { }
