import * as d3 from "d3";
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3ScaleChromatic from "d3-scale-chromatic";
import "d3-selection-multi";
import { scaleOrdinal, ScaleOrdinal, ScaleTime, scaleSequential, ScaleSequential } from "d3-scale";
import { Color } from "d3-color";
import { schemeAccent, interpolateSpectral } from "d3-scale-chromatic";

import { ChartObject } from "./chart-object";
import { LineData } from "../line-data";
import { ValueData } from "../value-data";


export abstract class BaseChartObject implements ChartObject {
    private svg: any;
    public canvasWidth: number;
    public canvasHeight: number;
    private width: number;
    private height: number;
    public margin: any;
    private x: any;
    protected xDomain: Array<Date>;
    private xScale: any;
    private y: any;
    protected yDomain: Array<number>;
    private yScale: any;
    protected fullDomain: Array<Date>;
    protected linesData: Array<LineData>;

    private lineColors: ScaleOrdinal<string, string>; // e.g. "#784a1c" --> "line_1"
    private yDomainMarginPercentage: number;

    constructor(
        canvasWidth: number = 900,
        canvasHeight: number = 500,
        margin: object = { top: 50, right: 0, bottom: 30, left: 80 },
        yDomainMarginPercentage: number = 10) {

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.margin = margin;
        this.yDomainMarginPercentage = yDomainMarginPercentage;

        this.fullDomain = new Array<Date>();

        this.width = this.canvasWidth - this.margin.left - this.margin.right;
        this.height = (this.canvasHeight - this.margin.top - this.margin.bottom);
    }

    public abstract setXDomain();
    public abstract setYDomain();


    public initSvg() {
        /* Canvas */
        this.svg = d3.select("#chart2").append("svg")
            .attr("width", this.canvasWidth + this.margin.left + this.margin.right)
            .attr("height", this.canvasHeight + this.margin.top + this.margin.bottom)
            .attrs({ "margin-top": this.margin.top, "margin-left": this.margin.left })
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        /* Set background */
        // want to make background bounded by the axis
        this.svg.append("rect")
          .attr("class", "chart-background")
          .attr({ "height": this.height, "width": this.width, "x": 0, "y": 0 });
    }

    public initAxis() {
        // set y-axis
        this.xScale = d3Scale.scaleTime().domain(this.xDomain).range([0, this.width]);
        let xAxis = d3Axis.axisBottom(this.xScale).tickFormat((d: Date) => d.formMonthYear());
        this.svg.append("g").attr("class", "xAxis").call(xAxis).attr("transform", "translate(" + 0 + ", " + this.height + ")");
        let currencyFormatter = d3.format("($.2f");
        this.createYMargin();
        this.yScale = d3Scale.scaleLinear().domain(this.yDomain).range([this.height, 0]);
        let yAxis = d3Axis.axisLeft(this.yScale).tickFormat((d) => currencyFormatter(d));
        this.svg.append("g").attr("class", "yAxis").call(yAxis).append("text")
    }

    private createYMargin(): void {
        let diff = this.yDomain[1] - this.yDomain[0];
        let margin = diff * this.yDomainMarginPercentage / 100;
        this.yDomain = [this.yDomain[0] - margin, this.yDomain[1] + margin];
    }

    public drawLine() {
        let handleLines = d3.line()
            .x((d: ValueData) => this.xScale(d.date))
            .y((d: ValueData) => this.yScale(d.value));

        let lines = this.svg.selectAll(".line1")
            .data(this.linesData)
            .enter()
            .append("g")
            .attr("class", "line1");
        lines.append("path")
            .attr("class", "line")
            .attr("d", (d: LineData) => handleLines(d.values))
            .style("stroke", (d: LineData) => this.lineColors(d.name))
            .style("fill-opacity", 0)
            .attr("id", function (d: LineData) { return d.name; });
    }

    public setLineColors(): void {
        this.lineColors = d3.scaleOrdinal()
            .domain(this.linesData.map(line => line.name))
            .range(d3ScaleChromatic.schemeAccent)
    }
}