import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AES } from 'crypto-js';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FinanceChartComponent } from './finance-chart.component';
import { MultiLineChartComponent } from "./d3/multi-line-chart/multi-line-chart.component";
import { D3Module } from "./d3/d3.module";

@NgModule({
  declarations: [
    AppComponent,
    FinanceChartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    D3Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
