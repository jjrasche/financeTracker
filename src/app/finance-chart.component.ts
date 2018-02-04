import { Component, OnInit, Input } from "@angular/core";
import { MultiLineChartComponent } from "./d3/multi-line-chart/multi-line-chart.component"
import { FinanceObject } from "./objects/finance/object/finance-object";
import { LineData } from "./objects/line-data";
import { ValueData } from "./objects/value-data";

import * as d3 from "d3";
import * as d3Scale from "d3-scale";
import * as d3ScaleChromatic from "d3-scale-chromatic";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import { BaseFinanceObject } from "./objects/finance/object/base-finance-object";

@Component({
    selector: "finance-chart",
    templateUrl: "./d3/multi-line-chart/multi-line-chart.component.html",
    styleUrls: ["./d3/multi-line-chart/multi-line-chart.component.css"]
})
export class FinanceChartComponent implements OnInit {
    @Input() protected data: BaseFinanceObject;
    // @Input() protected xDataProperty: string;
    // @Input() protected yDataProperty: string;

    constructor() {
    }

    ngOnInit() {
        this.formatData();
        this.data.initSvg();
        this.data.initAxis();
        this.data.drawLine();
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
        // let obj: FinanceObject = this.data[0];
        // let fullDomain = this.getFullDateDomain(obj);
        // let actualData = new LineData("actual");
        // let desiredData = new LineData("desired");
        // let minimumData = new LineData("minimum");

        // actualData.values.push(new ValueData(fullDomain[0], obj.originationAmount));
        // desiredData.values.push(new ValueData(fullDomain[0], obj.originationAmount));
        // minimumData.values.push(new ValueData(fullDomain[0], obj.originationAmount));

        // // fullDomain.forEach((date, index) => {
        // //     if (index === 1) {
        // //         return;
        // //     }
        // //     actualData.values.push(new ValueData(date, obj.data.actual[index]));
        // //     desiredData.values.push(new ValueData(date, obj.originationAmount + obj.data.desired * index));
        // //     minimumData.values.push(new ValueData(date, obj.originationAmount + obj.data.minimum * index));
        // // });

        // this.lineData =  [actualData, desiredData, minimumData];
        // this.xDomain = d3.extent(fullDomain);
        // this.yDomain = [this.getMinOfLineData(), this.getMaxOfLineData()];
        // this.lineColors = d3.scaleOrdinal()
        //     .domain(this.lineData.map(line => line.name))
        //     .range(d3ScaleChromatic.schemeAccent)

        // var sc = d3ScaleChromatic;
        // var ds = d3Scale;
    }

    // private getFullDateDomain(obj: FinanceObject): Array<Date> {
    //     let dateDomain = new Array<Date>();
    //     let startMonth = this.getFirstDayOfMonth(new Date(obj.originationDate));
    //     let numberOfMonths = obj.data.actual.length;
    //     dateDomain.push(startMonth);
    //     for (let i = 1; i < obj.data.actual.length; i++) {
    //         dateDomain.push(this.addMonthsToDate(startMonth, i))
    //     }
    //     return dateDomain;
    // }
}
