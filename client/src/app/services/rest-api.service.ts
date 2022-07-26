import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private readonly baseUrl: string = environment.restApiBaseUrl;

  constructor(private httpService: HttpClient) { }

  postData(url: string, data: any) {
    return this.httpService.post(`${this.baseUrl}${url}`, data);
  }

  getData(url: string) {
    return this.httpService.get(`${this.baseUrl}${url}`);
  }
}
