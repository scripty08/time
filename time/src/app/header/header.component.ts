import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';
import { HttpClient } from '@angular/common/http';
import {Config} from "./header.service";


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  config = {};

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
  }

  showConfig() {
  }

}
