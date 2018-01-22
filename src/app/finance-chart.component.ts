import { Component, OnInit, Input } from "@angular/core";
import { MultiLineChartComponent } from "./d3/multi-line-chart/multi-line-chart.component"
import { FinanceObject } from "./finance-object";
import { LineData } from "./chart-data";
import { ValueData } from "./value-data";

import * as d3 from "d3";
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

@Component({
    selector: "finance-chart",
    templateUrl: "./d3/multi-line-chart/multi-line-chart.component.html",
    styleUrls: ["./d3/multi-line-chart/multi-line-chart.component.css"]
})
export class FinanceChartComponent extends MultiLineChartComponent implements OnInit {

    constructor() {
        super(900, 500, { top: 20, right: 20, bottom: 30, left: 50 });
        this.title = "Finacne Chart";
        this.subtitle = "Test";
        this.xDataProperty = "data";

    }

    ngOnInit() {
        this.formatData();
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawLine();
    }

    /*
     create time referenced data arrays representing each data in dataSet
     in the format {name:<line_name>, values:<array of Y-axis values>}
     results 
     {
        name: "actual",
        values: [
            {date: dec 2016, value: 2500},
            {date: jan 2017, value: 2700},
            ...
        ]
     }

    */
    private formatData() {
        // create domain of dates
        let obj: FinanceObject = this.data[0];
        let domain = this.createDatesDomain(obj);
        let actualData = new LineData("actual");
        let desiredData = new LineData("desired");
        let minimumData = new LineData("minimum");
        let originalValue = obj.data.actual[0];

        domain.forEach((date, index) => {
            actualData.values.push(new ValueData(date, obj.data.actual[index]));
            desiredData.values.push(new ValueData(date, originalValue + obj.data.desired * index));
            minimumData.values.push(new ValueData(date, originalValue + obj.data.minimum * index));
        });

        this.lineData =  [actualData, desiredData, minimumData];
    }

    private createDatesDomain(obj: FinanceObject): Array<Date> {
        let dateDomain = new Array<Date>();
        let startMonth = this.getFirstDayOfMonth(new Date(obj.originationDate));
        dateDomain.push(startMonth);
        
        obj.data.actual.forEach((element, index) => {
            dateDomain.push(this.addMonthsToDate(startMonth, index+1));
        });

        return dateDomain;
    }

    private getFirstDayOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    private addMonthsToDate(date: Date, months: number): Date {
        return new Date(new Date(date).setMonth(date.getMonth() + months))
    }
}
