import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {MockInterface} from "./mock.interface";
import { Observable } from "rxjs/index";
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  rootURL = '/api';

  constructor(private http: HttpClient) { }

  findOne(id): Observable<MockInterface> {
    const params = new HttpParams().set('_id', id);

    return this.http.get<MockInterface>(this.rootURL + '/findOne', {params}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => of([]))
    );
  }

  update(data): Observable<any> {
    return this.http.post<MockInterface[]>(this.rootURL + '/update', data).pipe(
      map((res: any) => {
        if (!res.entries) {
          throw new Error('Value expected!');
        }
        return {entries: res.entries, updated: res.updated};
      }),
      catchError(err => of([]))
    );
  }
}
