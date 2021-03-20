import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {IData} from "../interfaces/timetracking.interface";
import { Observable } from "rxjs/index";
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimetrackingService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  read(year, month): Observable<IData[]> {

    const params = new HttpParams()
        .set('year', year)
        .set('month', month);

    return this.http.get<IData[]>(this.rootURL + '/times/read', {params}).pipe(
        map((res: any) => {
          if (!res.entries) {
            throw new Error('Value expected!');
          }
          return res.entries;
        }),
        catchError(err => of([]))
    );
  }

  update(data): Observable<IData[]> {
    return this.http.post<IData[]>(this.rootURL + '/times/update', data).pipe(
        map((res: any) => {
          if (!res.entries) {
            throw new Error('Value expected!');
          }
          return res.entries;
        }),
        catchError(err => of([]))
    );
  }

  destroy(_id): Observable<IData[]> {
      const params = new HttpParams()
          .set('_id', _id)
    return this.http.get<IData[]>(this.rootURL + '/times/destroy', {params}).pipe(
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
