import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IData} from "../interfaces/dashboard.interface";
import { Observable } from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public _url = '/assets/data.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<IData[]> {
    return this.http.get<IData[]>(this._url);
  }
}
