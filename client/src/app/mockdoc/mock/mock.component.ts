import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {CodeModel} from "./code.interface";
import {DashboardService} from "./mock.service";
import {ActivatedRoute, Router } from '@angular/router';
import {MockInterface} from "./mock.interface";

@Component({
  selector: 'mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.scss']
})
export class MockComponent implements OnInit {
  theme = 'vs-dark';
  newMockForm: FormGroup | undefined;
  id: string;
  mock: MockInterface;
  edit = false;

  constructor(private formBuilder:FormBuilder, private $mockService: DashboardService,  private $route: ActivatedRoute) {
    this.newMockForm = formBuilder.group({});
  }

  ngOnInit() {
    const id = this.$route.snapshot.paramMap.get('id');
    if (id) {
      this.edit = true;
      this.fetchMock(id)
    }
    this.initNewMockForm();
  }

  onSaveBtnClick() {
    this.updateMock(this.newMockForm.value);
  }

  codeModel: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: ''
  };

  codeModel2: CodeModel = {
    language: 'json',
    uri: 'main2.json',
    value: ''
  };

  options = {
    contextmenu: true,
    height: '1000px',
    minimap: {
      enabled: false
    }
  };

  onCodeChanged(value, name) {
    this.newMockForm.patchValue({
      [name]: value
    });
  }

  private initNewMockForm() {
    const controls = {
      '_id': new FormControl(null, Validators.required),
      'title': new FormControl(null, Validators.required),
      'category': new FormControl('Startpage', Validators.required),
      'path': new FormControl(null, Validators.required),
      'autoGenerate': new FormControl(null, Validators.required),
      'status': new FormControl('200', Validators.required),
      'contentType': new FormControl('application/json', Validators.required),
      'charset': new FormControl('UTF-8', Validators.required),
      'headers': new FormControl(null, Validators.required),
      'body': new FormControl(null, Validators.required),
    };
    this.newMockForm = new FormGroup(controls);
  }

  private updateMock(data) {
    this.$mockService.update(data).subscribe(rec => {
      this.newMockForm.patchValue(rec);
    });
  }

  private fetchMock(data) {
    this.$mockService.findOne(data).subscribe(response => {
      this.mock = response;
      this.codeModel = {
        language: 'json',
        uri: 'main.json',
        value: response.headers
      };
      this.codeModel2 = {
        language: 'json',
        uri: 'main2.json',
        value: response.body
      };
      this.newMockForm.patchValue(response);
    });
  }
}
