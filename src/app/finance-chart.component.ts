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
    @Input() protected data: Array<BaseFinanceObject>;

    constructor() {
    }

    ngOnInit() {
        this.data[0].initSvg();
        this.data[0].initAxis();
        this.data[0].drawLine();
    }
}
