import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IData} from "../interfaces/timetracking.interface";
import { Observable } from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class TimetrackingService {

  constructor(private http: HttpClient) { }

  getData(url = '/assets/data.json'): Observable<IData[]> {
    return this.http.get<IData[]>(url);
  }
}
