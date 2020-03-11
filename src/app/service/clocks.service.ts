import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Clock} from '../model/clock';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClocksService {

    EXAMPLE_SERVICE_URL = environment.baseUrlClocksService;

    constructor(private httpClient: HttpClient) {
    }

    public getAllData(): Observable<Clock[]> {
        return this.httpClient.get<Clock[]>(this.EXAMPLE_SERVICE_URL);
    }
}
