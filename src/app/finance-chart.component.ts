import { Component, OnInit, Input } from "@angular/core";
import { MultiLineChartComponent } from "./d3/multi-line-chart/multi-line-chart.component"
import { FinanceObject } from "./finance-object";
import { LineData } from "./line-data";
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
        super();
        this.canvasWidth = 900;
        this.canvasHeight = 500;
        this.margin = { top: 50, right: 0, bottom: 30, left: 80 };
        this.title = "Finacne Chart";
        this.subtitle = "Test";
        this.xDataProperty = "data";

    }

    ngOnInit() {
        this.initializeProperties();
        this.formatData();
        this.initSvg();
        this.initAxis();
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
        let fullDomain = this.getFullDateDomain(obj);
        let actualData = new LineData("actual");
        let desiredData = new LineData("desired");
        let minimumData = new LineData("minimum");
        let originalValue = obj.data.actual[0];

        fullDomain.forEach((date, index) => {
            actualData.values.push(new ValueData(date, obj.data.actual[index]));
            desiredData.values.push(new ValueData(date, originalValue + obj.data.desired * index));
            minimumData.values.push(new ValueData(date, originalValue + obj.data.minimum * index));
        });

        this.lineData =  [actualData, desiredData, minimumData];
        this.xDomain = d3.extent(fullDomain);
        this.yDomain = [this.getMinOfLineData(), this.getMaxOfLineData()];
        this.lineColors = d3.scaleOrdinal().domain(this.lineData.map(line => line.name)).range(d3.schemeCategory20c)
    }

    private getFullDateDomain(obj: FinanceObject): Array<Date> {
        let dateDomain = new Array<Date>();
        let startMonth = this.getFirstDayOfMonth(new Date(obj.originationDate));
        let numberOfMonths = obj.data.actual.length;
        dateDomain.push(startMonth);
        for (let i = 1; i < obj.data.actual.length; i++) {
            dateDomain.push(this.addMonthsToDate(startMonth, i))
        }
        return dateDomain;
    }

    private getMaxOfLineData(): number {
        return d3.max(this.lineData.map(line => d3.max(line.values.map(valueData => valueData.value))))
    }

    private getMinOfLineData(): number {
        return d3.min(this.lineData.map(line => d3.min(line.values.map(valueData => valueData.value))))
    }

    private getFirstDayOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    private addMonthsToDate(date: Date, months: number): Date {
        return new Date(new Date(date).setMonth(date.getMonth() + months))
    }
}
