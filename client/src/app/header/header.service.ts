import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
  headerServiceUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  headerServiceUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getConfig() {
    console.log('blaa');
    return this.http.get(this.headerServiceUrl);
  }
}
