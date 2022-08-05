import {
  Component,
  AfterViewInit,
  OnChanges,
  ViewChild,
  Input,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GridColumns, ActionColumn } from '../models/grid-columns';

@Component({
  selector: 'app-data-table-grid',
  templateUrl: './data-table-grid.component.html',
  styleUrls: ['./data-table-grid.component.scss'],
})
export class DataTableGridComponent implements OnChanges, AfterViewInit {
  @Input() apiUrl: string = '';
  @Input() columns: GridColumns[] = [];
  @Input() actionColumn: ActionColumn[] = [];

  displayedColumns: string[] = [];
  gridDatabase!: gridHttpDatabase | null;
  data: ApiResponse[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isNoResult = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private _httpClient: HttpClient) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.displayedColumns = this.columns.map((col: GridColumns) => {
      return col.key;
    });
    if (
      this.actionColumn.length > 0 &&
      !this.displayedColumns.includes('actionCol')
    ) {
      this.displayedColumns.push('actionCol');
    }
  }

  ngAfterViewInit() {
    this.gridDatabase = new gridHttpDatabase(this._httpClient, this.apiUrl);

    this.getTableData();
  }

  applyFilter(event: Event) {
    this.paginator.pageIndex = 0;
    const filterValue = (event.target as HTMLInputElement).value;
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.getTableData(filterValue);
  }

  getTableData(filterValue: string = ''): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.gridDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            filterValue
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          this.isNoResult = data === null;
          if (data === null) {
            return [];
          }
          this.resultsLength = data.data.count;
          return data.data.items;
        })
      )
      .subscribe((data) => (this.data = data));
  }
}

export interface ApiResponse {
  data: ApiDataObject;
}

export interface ApiDataObject {
  items: any[];
  count: number;
}

/** An grid database that the data source uses to retrieve data for the table. */
export class gridHttpDatabase {
  constructor(private _httpClient: HttpClient, private apiUrl: string) {}

  getRepoIssues(
    sort: string,
    order: SortDirection,
    page: number,
    query: string = ''
  ): Observable<ApiResponse> {
    const queryString = !!query ? `&q=${query}` : '';
    const href = this.apiUrl;
    const requestUrl = `${href}?sort=${sort}&order=${order}&page=${
      page + 1
    }${queryString}`;

    return this._httpClient.get<ApiResponse>(requestUrl);
  }
}
