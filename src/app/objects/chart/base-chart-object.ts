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
        // this.svg.append("rect")
        //   .attr("class", "chart-background")
        //   .attr({ "height": this.height, "width": this.width, "x": 0, "y": 0 });
    }

    public initAxis() {
        // Add the X Axis
        // this.svg.append("g")
        //   .attr("transform", "translate(0," + this.height + ")")
        //   .call(d3.axisBottom(d3.scaleTime().range([0, this.width])));
        // set x-axis
        this.xScale = d3Scale.scaleTime().domain(this.xDomain).range([0, this.width]);
        // this.svg.append("g")
        //   .attr("transform", "translate(0," + this.height + ")")
        //   .call(d3.axisBottom(this.xScale));

        let xAxis = d3Axis.axisBottom(this.xScale);//.tickFormat((d: Date) => this.monthNames[d.getMonth()] + " " + d.getFullYear());
        this.svg.append("g").attr("class", "xAxis").call(xAxis).attr("transform", "translate(" + 0 + ", " + this.height + ")");
        // set y-axis
        let currencyFormatter = d3.format("($.2f");
        this.adjustYDomain();
        this.yScale = d3Scale.scaleLinear().domain(this.yDomain).range([this.height, 0]);
        let yAxis = d3Axis.axisLeft(this.yScale).tickFormat((d) => currencyFormatter(d));
        this.svg.append("g").attr("class", "yAxis").call(yAxis).append("text")
    }

    private adjustYDomain(): void {
        let diff = this.yDomain[1] - this.yDomain[0];
        let margin = diff * this.yDomainMarginPercentage / 100;
        this.yDomain = [this.yDomain[0] - margin, this.yDomain[1] + margin];
    }

    public drawLine() {
        // this.line = d3Shape.line()
        //   .x((d: any) => this.x(d.date))
        //   .y((d: any) => this.y(d.value));

        // this.svg.append("path")
        //   .datum(this.data)
        //   .attr("class", "line")
        //   .attr("d", this.line);



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
            // .attr("d", handleLines)
            .attr("d", (d: LineData) => handleLines(d.values))
            .style("stroke", (d: LineData) => this.lineColors(d.name))
            // .style("stroke", "#784a1c")
            .style("fill-opacity", 0)
            .attr("id", function (d: LineData) { return d.name; });

        // this.svg.append("path")
        //   .data([this.lineData[0].values])
        //   .attr("class", "line")
        //   .attr("d", this.line);

        // var data = [{ date: new Date("1-May-12"), close: 58.13 },
        // { date: new Date("30-Apr-12"), close: 53.98 },
        // { date: new Date("27-Apr-12"), close: 67.00 },
        // { date: new Date("26-Apr-12"), close: 89.70 },
        // { date: new Date("25-Apr-12"), close: 99.00 },
        // { date: new Date("24-Apr-12"), close: 130.28 },
        // { date: new Date("23-Apr-12"), close: 166.70 },
        // { date: new Date("20-Apr-12"), close: 234.98 },
        // { date: new Date("19-Apr-12"), close: 345.44 },
        // { date: new Date("18-Apr-12"), close: 443.34 },
        // { date: new Date("17-Apr-12"), close: 543.70 },
        // { date: new Date("16-Apr-12"), close: 580.13 },
        // { date: new Date("13-Apr-12"), close: 605.23 },
        // { date: new Date("12-Apr-12"), close: 622.77 },
        // { date: new Date("11-Apr-12"), close: 626.20 },
        // { date: new Date("10-Apr-12"), close: 628.44 },
        // { date: new Date("9-Apr-12"), close: 636.23 },
        // { date: new Date("5-Apr-12"), close: 633.68 },
        // { date: new Date("4-Apr-12"), close: 624.31 },
        // { date: new Date("3-Apr-12"), close: 629.32 },
        // { date: new Date("2-Apr-12"), close: 618.63 },
        // { date: new Date("30-Mar-12"), close: 599.55 },
        // { date: new Date("29-Mar-12"), close: 609.86 },
        // { date: new Date("28-Mar-12"), close: 617.62 },
        // { date: new Date("27-Mar-12"), close: 614.48 },
        // { date: new Date("26-Mar-12"), close: 606.98 }];

        // // set the ranges
        // var x = d3.scaleTime().range([0, this.width]);
        // var y = d3.scaleLinear().range([this.height, 0]);
        // // Scale the range of the data
        // x.domain(d3.extent(data, function (d) { return d.date; }));
        // y.domain([0, d3.max(data, function (d) { return d.close; })]);

        // // define the line
        // var valueline = d3.line()
        //   .x(function (d) { return x(d.date); })
        //   .y(function (d) { return y(d.close); });
        // // Add the valueline path.
        // this.svg.append("path")
        //   .data([data])
        //   .attr("class", "line")
        //   .attr("d", valueline);

        // // Add the X Axis
        // this.svg.append("g")
        //   .attr("transform", "translate(0," + this.height + ")")
        //   .call(d3.axisBottom(x));
        // // Add the Y Axis
        // this.svg.append("g").call(d3.axisLeft(y));
    }

    public setLineColors(): void {
        this.lineColors = d3.scaleOrdinal()
            .domain(this.linesData.map(line => line.name))
            .range(d3ScaleChromatic.schemeAccent)
    }
}