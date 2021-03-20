import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() page = 0;
  @Input() results = 10;
  @Input() total = 0;

  @Output() onChange = new EventEmitter<object>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onPaginationChange(e): void {
    this.onChange.emit(e);
  }

  showConfig() {
  }

}
