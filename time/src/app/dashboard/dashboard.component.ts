import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {DataService} from "./data.service";
import {IData} from "./data.interface";
import {Data} from "./data.model";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public data:IData[] = [];

    timesForm:FormGroup = new FormGroup({});

    constructor(private _dataService:DataService) {
    }

    ngOnInit() {
        this.fetchTimesData();
        this.initTimesForm();
    }

    onSubmit() {
        console.log("reactive form submitted");
        console.log(this.timesForm);
        
    }

    private initTimesForm():void {
        this.timesForm = new FormGroup({
            'start': new FormControl(null, Validators.required),
            'stop': new FormControl(null, Validators.required),
            'pause': new FormControl(null, Validators.required)
        });
    }

    private fetchTimesData() {
        this._dataService.getData()
            .subscribe((data) => {
                let calculatedData = this.calculateIst(data);
                return this.data = calculatedData;
            });
    };

    private calculateIst(data:IData[]) {
        return data.map((rec:IData) => {
            rec.ist = rec.start - rec.end;
            return rec
        });
    }
}
