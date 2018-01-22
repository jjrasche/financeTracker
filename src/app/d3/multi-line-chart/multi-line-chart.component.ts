import { Component, OnInit, Input } from "@angular/core";
import * as d3 from "d3";
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import { scaleOrdinal, ScaleOrdinal, scaleSequential, ScaleSequential } from "d3-scale";
import { Color } from "d3-color";
import { schemeAccent, interpolateSpectral } from "d3-scale-chromatic";
import { LineData } from "../../chart-data";

@Component({
  selector: "multi-line-chart",
  templateUrl: "./multi-line-chart.component.html",
  styleUrls: ["./multi-line-chart.component.css"]
})
export abstract class MultiLineChartComponent {
  public title: string;
  public subtitle: string;

  @Input() protected data: any;
  @Input() protected xDataProperty: string;
  @Input() protected yDataProperty: string;

  public chartWidth: number;
  public chartHeight: number;
  protected scaleWidth: number;
  protected scaleHeight: number;
  protected margin: any;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  protected lineColors: ScaleSequential<string>; // e.g. "#784a1c" --> "line_1"
  protected lineData: Array<LineData>;

  constructor(chartWidth, chartHeight, margin) { 
    this.chartHeight= chartHeight;
    this.chartWidth = chartWidth;
    this.margin = margin;

    this.scaleWidth = this.chartWidth - this.margin.left - this.margin.right;
    this.scaleHeight = this.chartHeight - this.margin.top - this.margin.bottom;
    this.lineColors = d3Scale.scaleSequential(interpolateSpectral);
  }

  protected initSvg() {
    this.svg = 
      d3.select("svg")
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  protected initAxis() {
    let d = d3;
    let da = this.data;
    let xDomain = d3.extent(this.data, (d) => d[this.xDataProperty]) as [Date, Date];
    this.x = d3Scale.scaleTime()
      .range([0, this.scaleWidth])
      .domain(xDomain);
    this.y = d3Scale.scaleLinear()
      .range([this.scaleHeight, 0])
      .domain(d3Array.extent(this.data, (d) => d[this.yDataProperty]));
  }

  protected drawAxis() {
    this.svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.scaleHeight + ")")
      .call(d3Axis.axisBottom(this.x));

    this.svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");
  }

  protected drawLine() {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));

    this.svg.append("path")
      .datum(this.data)
      .attr("class", "line")
      .attr("d", this.line);
  }

}
