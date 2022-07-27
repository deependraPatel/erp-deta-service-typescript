import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestApiService } from '../services/rest-api.service';
import { URLS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class FormResolver implements Resolve<boolean> {
  constructor(private readonly restApiService: RestApiService, private readonly router: Router){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.restApiService.getData(`${URLS.form}/route/${route.url[0].path}`).pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
