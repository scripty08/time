import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  headerServiceUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  headerServiceUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getConfig() {
    console.log('blaa');
    return this.http.get(this.headerServiceUrl);
  }
}
