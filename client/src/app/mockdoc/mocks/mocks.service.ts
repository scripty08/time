import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/index";
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MocksService {
  rootURL = '/api';

  constructor(private http: HttpClient) { }

  read(pagination): Observable<any> {
    let params = new HttpParams()
    Object.keys(pagination).forEach(k => {
      params = params.set(k, pagination[k]);
    });

    return this.http.get<any>(this.rootURL + '/read', {params}).pipe(
      map((res: any) => {
        if (!res.entries) {
          throw new Error('Value expected!');
        }
        return {
          entries: res.entries,
          pagination: res.pagination
        }
      }),
      catchError(err => of([]))
    );
  }
}
