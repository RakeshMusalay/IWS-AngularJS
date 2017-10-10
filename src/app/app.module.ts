import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CarService } from './car.service';
import { DashboardComponent } from './dashboard.component';
import { CarsComponent } from './cars.component';
import { CarDetailComponent } from './car-detail.component';
import { CarSearchComponent } from './car-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 600 })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    CarSearchComponent,
    CarsComponent,
    CarDetailComponent,
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }