import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MockComponent} from './mockdoc/mock/mock.component';
import {DashboardService} from './mockdoc/mock/mock.service';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {TimetrackingService} from "./timetracking/services/timetracking.service";
import {TimetrackingComponent} from './timetracking/components/timetracking.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {CodeEditorModule} from '@ngstack/code-editor';
import {MocksComponent} from "./mockdoc/mocks/mocks.component";
import {PaginationComponent} from "./pagination/pagination.component";
import {GlobalService} from "./global.service";
import {WINDOW_PROVIDERS} from "./window.providers";

const appRoutes = [
  {path: '', component: MockComponent},
  {path: 'edit/:id', component: MockComponent},
  {path: 'my-mocks', component: MocksComponent},
  {path: 'timetracking', component: TimetrackingComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MockComponent,
    MocksComponent,
    TimetrackingComponent,
    HeaderComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    NgxMaterialTimepickerModule.setLocale('de-DE'),
    CodeEditorModule.forRoot()
  ],
  providers: [DashboardService, TimetrackingService, WINDOW_PROVIDERS, GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
