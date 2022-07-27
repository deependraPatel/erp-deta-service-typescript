import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms.component';
import { NewFormComponent } from './new-form/new-form.component';
import { FormsListComponent } from './forms-list/forms-list.component';

const routes: Routes = [
  {
    path: '',
    component: FormsComponent,
    children: [
      {
        path: '',
        component: FormsListComponent,
        data: {
          title: 'Forms List',
          subTitle: 'Listing the forms with edit and delete option.',
          buttons: [
            {
              label: 'New Form',
              class: 'bg-color-secondary',
              iconClass: 'fa fa-plus',
              route: '/forms/create',
            },
          ],
        },
      },
      {
        path: 'create',
        component: NewFormComponent,
        data: {
          title: 'New Form',
          subTitle: 'Create new form dynamically.',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
