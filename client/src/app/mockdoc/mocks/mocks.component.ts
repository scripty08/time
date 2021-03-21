import {Component, OnInit} from '@angular/core';
import {MocksService} from "./mocks.service";
import {MocksInterface} from "./mocks.interface";
import {Router} from '@angular/router';
import {PaginationInterface} from "../../pagination/pagination.interface";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GlobalService} from "../../global.service";
import {ToastService} from "../../toast/toast.service";

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
  serviceUrl = '';
  paginationSize: number;

  constructor(
    private $mockService: MocksService,
    private router: Router,
    private modalService: NgbModal,
    public globalService: GlobalService,
    public toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.readData({page: 0, results: 5});
    this.serviceUrl = this.globalService.getFullHostname() + '/api/mock'
  }

  onSaveBtnClick(): void {
    console.log(this.mocks);
  }

  onPaginationChange(page) {
    this.readData({page: page-1, results: 5});
  }

  onDeleteClick(content, _id): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.$mockService.destroy({_id}).subscribe(response => {
        this.readData({page: 0, results: 5});
        this.toastService.show('deleted!', { classname: 'bg-success text-light', delay: 3000 });
      });

    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }


  private readData(pagination) {
    this.$mockService.read(pagination).subscribe(response => {
      this.mocks = response.entries;
      //this.pagination = response.pagination;
      this.paginationSize = Math.ceil(response.pagination.total / response.pagination.results);
    });
  }

  goto(id: string) {
    this.router.navigate(['/edit/' + id]);
  }

  copyText(val: string) {
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
    this.toastService.show(val + ' copied!', { classname: 'bg-success text-light', delay: 3000 });
  }
}
