import { Component, OnInit, Input } from "@angular/core";
import { LineChartComponent } from "./d3/line-chart/line-chart.component"

import * as d3 from "d3";
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

@Component({
    selector: "finance-chart",
    templateUrl: "./d3/line-chart/line-chart.component.html",
    styleUrls: ["./d3/line-chart/line-chart.component.css"]
})
export class FinanceChartComponent extends LineChartComponent implements OnInit {

    constructor() {
        super(900, 500, { top: 20, right: 20, bottom: 30, left: 50 });
        this.title = "Finacne Chart";
        this.subtitle = "Test";
        this.xDataProperty = "data";

    }

    ngOnInit() {
        this.reFormData();
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawLine();
    }

    private reFormData() {
        this.data = this.data.data.actual;
    }
}
