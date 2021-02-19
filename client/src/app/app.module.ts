import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { DashboardService } from './dashboard/services/dashbaord.service';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import {TimetrackingService} from "./timetracking/services/timetracking.service";
import { TimetrackingComponent } from './timetracking/components/timetracking.component';

const appRoutes = [
    { path: '', component: DashboardComponent },
    { path: 'timetracking', component: TimetrackingComponent },
    { path: 'games', component: DashboardComponent },
  ]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TimetrackingComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot()
  ],
  providers: [DashboardService, TimetrackingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
