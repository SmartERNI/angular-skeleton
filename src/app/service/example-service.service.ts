import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ExampleData} from '../model/example-data';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExampleServiceService {

  constructor(private httpClient: HttpClient) { }

  EXAMPLE_SERVICE_URL = environment.baseUrlExampleService;

  public getAllData(): Observable<ExampleData> {
    return this.httpClient.get<ExampleData>(this.EXAMPLE_SERVICE_URL);
  }
}
