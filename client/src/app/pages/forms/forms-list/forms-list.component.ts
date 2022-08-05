import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { GridColumns, ActionColumn } from '../../../models/grid-columns';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss']
})
export class FormsListComponent implements OnInit {

  public readonly apiUrl = `${environment.restApiBaseUrl}forms`;
  public readonly columns: GridColumns[] = [
    {
      title: 'Title',
      sort: true,
      filter: {
        type: 'text',
      },
      key: 'formTitle',
    },
    {
      title: 'Sub Title',
      sort: false,
      filter: {
        type: 'text',
      },
      key: 'formSubTitle'
    },
    {
      title: 'Model',
      sort: false,
      filter: {
        type: 'text',
      },
      key: 'dataModelName'
    },
    {
      title: 'Route',
      sort: false,
      filter: {
        type: 'text',
      },
      key: 'routePath'
    },
    {
      title: 'Last Updated',
      sort: true,
      filter: {
        type: 'date'
      },
      key: 'updatedAt',
      type: 'date',
    }
  ];
  public readonly actionCol: ActionColumn[] = [
    {
      title: 'Edit',
      matIconName: 'edit'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
