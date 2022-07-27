import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModules } from '../material-modules';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormResolver } from '../resolvers/form.resolver';

const routes: Routes = [
  {
    path: ':formId',
    component: DynamicFormComponent,
    resolve: {
      form: FormResolver
    }
  }
]

@NgModule({
  declarations: [
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModules,
    RouterModule.forChild(routes),
  ],
  exports: [DynamicFormComponent]
})
export class DynamicFormModule { }
