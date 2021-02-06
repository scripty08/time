import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';
import {IData} from "./data.interface";

describe('DataService', () => {
  let dataService: DataService,
      httpTestingCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          HttpClientTestingModule
      ],
      providers: [
          DataService
      ]
    });
  });

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    httpTestingCtrl = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingCtrl.verify()
  });

  it('should retrieve all data', () => {

    const testGet: IData[] = [
      {
        "kw": "1",
        "date": "1.2.2021",
        "day": "Montag",
        "start": 800,
        "end": 1600,
        "ist": 8
      },
      {
        "kw": "1",
        "date": "2.2.2021",
        "day": "Dienstag",
        "start": 800,
        "end": 1600,
        "ist": 8
      }
    ];

    dataService.getData().subscribe((data) => {
        expect(testGet).toBe(data, 'should check mocked data');
    });

    const req = httpTestingCtrl.expectOne(dataService._url);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(testGet)
  });
});
