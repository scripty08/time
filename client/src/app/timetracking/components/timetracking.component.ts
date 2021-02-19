import { AfterContentChecked, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import CalendarDates from 'calendar-dates';
import * as moment from 'moment';
import { IData } from '../interfaces/timetracking.interface';
import { TimetrackingService } from '../services/timetracking.service';

@Component({
  selector   : 'timetracking',
  templateUrl: '../templates/timetracking.component.html',
  styleUrls  : ['../styles/timetracking.component.scss']
})
export class TimetrackingComponent implements OnInit, AfterContentChecked {

  timesForm: FormGroup | undefined;
  toolbarForm: FormGroup | undefined;
  years = [2021, 2022, 2023];
  months = [
    { text: 'Januar', value: 1 },
    { text: 'Februar', value: 2 },
    { text: 'März', value: 3 },
    { text: 'April', value: 4 },
    { text: 'Mai', value: 5 },
    { text: 'Juni', value: 6 },
    { text: 'Juli', value: 7 },
    { text: 'August', value: 8 },
    { text: 'September', value: 9 },
    { text: 'Oktober', value: 10 },
    { text: 'November', value: 11 },
    { text: 'Dezember', value: 12 }
  ];
  dates = [];
  controlls = {};
  currentYear = parseInt(moment().format('Y'));
  currentMonth = parseInt(moment().format('M'));
  data: Array<IData>;

  constructor(private formBuilder: FormBuilder, private $timetrackingService: TimetrackingService) {
    this.timesForm = formBuilder.group({});
    this.toolbarForm = formBuilder.group({year: '', month: ''});
    this.fetchData('/assets/data.json');
    moment.locale('de');
  }



  async ngOnInit() {
    await this.initTimesForm();
    this.initToolbarForm();
  }

  ngAfterContentChecked() {
    this.timesForm.reset();
    if (this.data) {
      this.data.forEach((rec, idx) => {
        this.timesForm.patchValue(rec);
      });
    }
  }

  async onSelectMonthChange(e) {
    this.currentMonth = e.target.value;
    this.fetchData('/assets/data2.json');
    await this.initTimesForm();
  }

  async onSelectYearChange(e) {
    this.currentYear = e.target.value;
    await this.initTimesForm();
  }

  onSaveBtnClick(): void {
    console.log(this.timesForm, ' <----------- timesForm ------------');
  }

  onInput(event): void {
    const name = event.target.name;
    const value = event.target.value;
    this.data.map((rec) => {
      rec[name] = value;
    });
  }

  private initToolbarForm() {
    this.toolbarForm = new FormGroup({
      year: new FormControl(moment().format('Y'), Validators.required),
      month: new FormControl(moment().format('M'), Validators.required)
    });
  }

  private async initTimesForm() {
    const calendarDates = new CalendarDates();
    const year      = new Date(this.currentYear, this.currentMonth -1);
    const dates         = await calendarDates.getDates(year);

    this.dates     = dates.map((rec, idx) => {
      this.addControlls(idx);
      rec.day = moment(rec.iso).format('dddd');
      rec.kw  = moment(rec.iso).format('W')
      rec.iso = moment(rec.iso).format('DD.MM.YYYY');
      return rec;
    }).filter(val => val.type === 'current');
    this.timesForm = new FormGroup(this.controlls);
  }

  private addControlls(idx: number): void {
    this.controlls['date-'+idx] = new FormControl(null, Validators.required);
    this.controlls['start-'+idx] = new FormControl(null, Validators.required);
    this.controlls['stop-'+idx] = new FormControl(null, Validators.required);
    this.controlls['pause-'+idx] = new FormControl(null, Validators.required);
    this.controlls['checkbox1-'+idx] = new FormControl(null, Validators.required);
    this.controlls['checkbox2-'+idx] = new FormControl(null, Validators.required);
    this.controlls['checkbox3-'+idx] = new FormControl(null, Validators.required);
    this.controlls['checkbox4-'+idx] = new FormControl(null, Validators.required);
  }

  private fetchData(url) {
    this.$timetrackingService.getData(url).subscribe((rec) => {
      this.data = rec;
    });
  }
}
