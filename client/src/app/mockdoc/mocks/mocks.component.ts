import {Component, OnInit} from '@angular/core';
import {MocksService} from "./mocks.service";
import {MocksInterface} from "./mocks.interface";
import { Router } from '@angular/router';
import {PaginationInterface} from "../../pagination/pagination.interface";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {GlobalService} from "../../global.service";

@Component({
  selector: 'mocks',
  templateUrl: './mocks.component.html',
  styleUrls: ['./mocks.scss']
})
export class MocksComponent implements OnInit {
  theme = 'vs-dark';
  mocks: MocksInterface[];
  pagination: PaginationInterface = {page: 1, results: 10, total: 1};
  closeResult = '';

  constructor(
    private $mockService: MocksService,
    private router: Router,
    private modalService: NgbModal,
    public globalService: GlobalService
  ) {
  }

  ngOnInit(): void {
    this.readData({
      page: 0,
      results: 5
    });
  }

  onSaveBtnClick(): void {
    console.log(this.mocks);
  }

  onPaginationChange(pagination) {
    this.readData(pagination)
  }

  onDeleteClick(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }


  private readData(pagination) {
    this.$mockService.read(pagination).subscribe(response => {
      this.mocks = response.entries;
      this.pagination = response.pagination;
    });
  }

  goto(id: string) {
    this.router.navigate(['/edit/' + id]);
  }

  copyText(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
