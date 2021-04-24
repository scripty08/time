import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import {CodeModel} from "./code.interface";
import {MockService} from "./mock.service";
import {ActivatedRoute, Router } from '@angular/router';
import {MockInterface} from "./mock.interface";
import {ToastService} from "../../toast/toast.service";
import {GlobalService} from "../../global.service";


function pathValidator (control: AbstractControl):{[key: string]: boolean} | null {

  if( control.value !==null && control.value.indexOf('/') === -1){
    return {'pathValidator': true}
  }
  return null;
};


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
  serviceUrl = '';

  constructor(
    private formBuilder:FormBuilder,
    private $mockService: MockService,
    private $route: ActivatedRoute,
    private router: Router,
    public toastService: ToastService,
    public globalService: GlobalService,
  ) {
    this.newMockForm = formBuilder.group({});
  }

  ngOnInit() {
    this.serviceUrl = this.globalService.getFullHostname() + '/api/mock'
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
  onCancelBtnClick() {
    this.router.navigate(['/manage-mocks']);
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

  private initNewMockForm() {
    const controls = {
      '_id': new FormControl(null),
      'title': new FormControl(null, Validators.required),
      'path': new FormControl(null, [Validators.required, pathValidator]),
      'status': new FormControl('200', Validators.required),
      'contentType': new FormControl('application/json', Validators.required),
      'charset': new FormControl('UTF-8', Validators.required),
      'headers': new FormControl(null),
      'body': new FormControl(null),
    };
    this.newMockForm = new FormGroup(controls);
  }

  private updateMock(data) {
    this.$mockService.update(data).subscribe((rec) => {
      this.newMockForm.patchValue(rec.entries);
      this.toastService.show('saved!', { classname: 'bg-success text-light', delay: 3000 });
      this.router.navigate(['/edit/' + rec.updated._id]);
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
