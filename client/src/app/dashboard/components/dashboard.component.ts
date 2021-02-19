import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import CalendarDates from 'calendar-dates';

@Component({
    selector: 'dashboard',
    templateUrl: '../templates/dashboard.component.html',
    styleUrls: ['../styles/dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    timesForm: FormGroup | undefined;

    ngOnInit() {
      const calendarDates = new CalendarDates()
      const year2021 =  new Date(2021, 2);
      const mayDates = calendarDates.getDates(year2021);
      const mayMatrix = calendarDates.getMatrix(year2021);

      this.timesForm = new FormGroup({
        'start': new FormControl(null, Validators.required),
        'stop': new FormControl(null, Validators.required),
        'pause': new FormControl(null, Validators.required)
      });
    }

    onSubmit() {
        console.log("reactive form submitted");
        console.log(this.timesForm);
    }
}
