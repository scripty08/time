import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {MocksInterface} from "./mocks.interface";
import { Observable } from "rxjs/index";
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MocksService {
  rootURL = '/api';

  constructor(private http: HttpClient) { }

  read(pagination): Observable<MocksInterface[]> {
    const params = new HttpParams()
      .set('pagination', pagination);

    return this.http.get<MocksInterface[]>(this.rootURL + '/read', {params}).pipe(
      map((res: any) => {
        if (!res.entries) {
          throw new Error('Value expected!');
        }
        return res.entries;
      }),
      catchError(err => of([]))
    );
  }
}
