import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { MaterialModules } from '../material-modules';
import { DataTableGridComponent } from './data-table-grid.component';

@NgModule({
  declarations: [DataTableGridComponent],
  imports: [CommonModule, MaterialModules, HttpClientModule],
  exports: [DataTableGridComponent],
})
export class DataTableGridModule {}
