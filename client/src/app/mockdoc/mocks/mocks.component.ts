import {Component, OnInit} from '@angular/core';
import {MocksService} from "./mocks.service";
import {MocksInterface} from "./mocks.interface";
import { Router } from '@angular/router';

@Component({
  selector: 'mocks',
  templateUrl: './mocks.component.html',
  styleUrls: ['./mocks.scss']
})
export class MocksComponent implements OnInit {
  theme = 'vs-dark';
  mocks: MocksInterface[];
  constructor(private $mockService: MocksService, private router: Router ) {
  }

  ngOnInit() {
    this.readData({
      page: 0
    });
  }

  onSaveBtnClick() {
    console.log(this.mocks);
  }

  private readData(pagination) {
    this.$mockService.read(pagination).subscribe(response => {
      this.mocks = response;
    });
  }

  goto(id: string) {
    this.router.navigate(['/edit/' + id]);
  }
}
