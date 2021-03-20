import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import CalendarDates from 'calendar-dates';
import * as moment from 'moment';
import { IData } from '../interfaces/timetracking.interface';
import { TimetrackingService } from '../services/timetracking.service';

@Component({
    selector: 'timetracking',
    templateUrl: '../templates/timetracking.component.html',
    styleUrls: ['../styles/timetracking.component.scss']
})
export class TimetrackingComponent implements OnInit {

    timesForm:FormGroup | undefined;
    toolbarForm:FormGroup | undefined;
    years = [2021, 2022, 2023];
    months = [
        {text: 'Januar', value: 1},
        {text: 'Februar', value: 2},
        {text: 'März', value: 3},
        {text: 'April', value: 4},
        {text: 'Mai', value: 5},
        {text: 'Juni', value: 6},
        {text: 'Juli', value: 7},
        {text: 'August', value: 8},
        {text: 'September', value: 9},
        {text: 'Oktober', value: 10},
        {text: 'November', value: 11},
        {text: 'Dezember', value: 12}
    ];
    dates = [];
    currentYear = parseInt(moment().format('Y'));
    currentMonth = parseInt(moment().format('M'));
    data:Array<IData>;
    range = [];

    constructor(private formBuilder:FormBuilder, private $timetrackingService:TimetrackingService) {
        this.timesForm = formBuilder.group({});
        this.toolbarForm = formBuilder.group({year: '', month: ''});
        this.fetchData(this.currentYear, this.currentMonth);
        moment.locale('de');
    }

    async ngOnInit() {
        await this.initTimesForm();
        this.initToolbarForm();
    }

    async onSelectMonthChange(e) {
        this.currentMonth = e.target.value;
        this.fetchData(this.currentYear, this.currentMonth);
        await this.initTimesForm();
    }

    async onSelectYearChange(e) {
        this.currentYear = e.target.value;
        await this.initTimesForm();
    }

    onSaveBtnClick():void {
        const data = Object.keys(this.timesForm.value).map((key:any) => {
            if (this.timesForm.controls[key].dirty) {
                return this.timesForm.controls[key].value['row-control'];
            }
        }).filter(val => typeof val !== 'undefined');

        this.updateData(data);
    }

    private initToolbarForm() {
        this.toolbarForm = new FormGroup({
            year: new FormControl(moment().format('Y'), Validators.required),
            month: new FormControl(moment().format('M'), Validators.required)
        });
    }

    onResetBtnClick(): void {
        this.timesForm.reset();
    }

    onDeleteBtnClick(date): void {
        const data = this.timesForm.getRawValue();
        const _id = data['row-group-'+date]['row-control']._id;
        if(_id) {
            this.destroyData(_id)
        }
    }

    onRangeChange(e, controlName): void {
        const values = this.timesForm.getRawValue();
        const rowControl = values[controlName]['row-control'];
        rowControl.pause = e.target.value;
        this.timesForm.patchValue(values);
    }


    private async initTimesForm() {
        const calendarDates = new CalendarDates();
        const year = new Date(this.currentYear, this.currentMonth - 1);
        const dates = await calendarDates.getDates(year);
        const controls = {};

        this.dates = dates.map((rec:any, idx) => {
            rec.day = moment(rec.iso).format('ddd');
            rec.kw = moment(rec.iso).format('W');
            rec.datum = moment(rec.iso).format('DD.MM.YYYY');
            rec.date = moment(rec.iso).format('DD.MM.YYYY');
            const controlName = 'row-group-' + rec.datum;
            rec.controlName = controlName;
            controls[controlName] = new FormGroup({
                'row-control': new FormGroup({
                    '_id': new FormControl(null, Validators.required),
                    'datum': new FormControl(rec.iso, Validators.required),
                    'start': new FormControl(null, Validators.required),
                    'stop': new FormControl(null, Validators.required),
                    'pause': new FormControl(0, Validators.required),
                    'ist': new FormControl(null, Validators.required),
                    'krank': new FormControl(null, Validators.required),
                    'urlaub': new FormControl(null, Validators.required),
                    'ueberstunden': new FormControl(null, Validators.required),
                    'konferenz': new FormControl(null, Validators.required),
                })
            });

            return rec;
        }).filter((val:any) => val.type === 'current');

        this.timesForm = new FormGroup(controls);
    }


    private fetchData(year, month) {
        this.$timetrackingService.read(year, month).subscribe(rec => {
            console.log(rec, ' <------------ rec --------------');
            this.timesForm.patchValue(rec);
        });
    }

    private updateData(data) {
        this.$timetrackingService.update(data).subscribe(rec => {
            this.timesForm.patchValue(rec);
        });
    }

    private destroyData(_id) {
        this.$timetrackingService.destroy(_id);
    }
}
