import { Component, OnInit, Input } from "@angular/core";
import * as d3 from "d3";
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import "d3-selection-multi";
import { scaleOrdinal, ScaleOrdinal, ScaleTime, scaleSequential, ScaleSequential } from "d3-scale";
import { Color } from "d3-color";
import { schemeAccent, interpolateSpectral } from "d3-scale-chromatic";
import { LineData } from "../../objects/line-data";
import { ValueData } from "../../objects/value-data";
import { BaseFinanceObject } from "../../objects/finance/object/base-finance-object";

@Component({
  selector: "multi-line-chart",
  templateUrl: "./multi-line-chart.component.html",
  styleUrls: ["./multi-line-chart.component.css"]
})
export class MultiLineChartComponent {
  public title: string;
  public subtitle: string;

  @Input() protected data: BaseFinanceObject;
  // @Input() protected xDataProperty: string;
  // @Input() protected yDataProperty: string;

  private svg: any;
  
  constructor() {
  }



}
