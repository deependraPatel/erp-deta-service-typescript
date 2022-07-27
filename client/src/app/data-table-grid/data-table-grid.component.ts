import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Input,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-data-table-grid',
  templateUrl: './data-table-grid.component.html',
  styleUrls: ['./data-table-grid.component.scss'],
})
export class DataTableGridComponent implements OnInit, AfterViewInit {
  @Input() dataUrl: string = '';
  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  gridDatabase!: gridHttpDatabase | null;
  data: GithubIssue[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.gridDatabase = new gridHttpDatabase(this._httpClient, this.dataUrl);

    this.getTableData();
  }

  ngOnInit(): void {}

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
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.total_count;
          return data.items;
        })
      )
      .subscribe((data) => (this.data = data));
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An grid database that the data source uses to retrieve data for the table. */
export class gridHttpDatabase {
  constructor(private _httpClient: HttpClient, private dataUrl: string) {}

  getRepoIssues(
    sort: string,
    order: SortDirection,
    page: number,
    query: string = ''
  ): Observable<GithubApi> {
    const queryString = !!query ? `q=${query}` : '';
    const href = this.dataUrl;
    const requestUrl = `${href}?sort=${sort}&order=${order}&page=${
      page + 1
    }&${queryString}`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}
