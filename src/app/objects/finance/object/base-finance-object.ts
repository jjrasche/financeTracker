import * as d3 from "d3";

import { FinanceData } from "../data/finance-data";
import { FinanceObjectType } from "./finance-object-type";
import { LineData } from "../../line-data";
import { FinanceObject } from "./finance-object";
import { BaseChartObject } from "../../chart/base-chart-object";
import { ValueData } from "../../value-data";

export class BaseFinanceObject extends BaseChartObject implements FinanceObject {
    name: string;
    originationDate: Date;
    type: FinanceObjectType
    originationAmount: number;
    financeData: Array<FinanceData<any>>;

    constructor() {
        super();
        this.setXDomain();
        this.setLinesData();
        this.setYDomain();
    }
    
    public setXDomain(): void {
        let startMonth = this.originationDate.getFirstDayOfMonth();
        let currentMonth = this.originationDate.getFirstDayOfMonth();
        let numberOfMonths = this.originationDate.monthsBetween(currentMonth);

        this.fullDomain.push(startMonth);
        for (let i = 1; i < numberOfMonths; i++) {
            this.fullDomain.push(startMonth.addMonthsToDate(i))
        }
        this.xDomain = d3.extent(this.fullDomain);
    }

    public setLinesData(): void {
        this.linesData = new Array<LineData>();
        this.financeData.forEach((fd: FinanceData<any>) => {
            let lineData = fd.convertToLineData(this.fullDomain);
            this.linesData.concat(lineData);
        });
        
    }

    public setYDomain(): void {
        let allYValues = new Array<number>();
        this.linesData.forEach(d => {
            allYValues.concat(d.values.map((vd: ValueData) => vd.value));
        });
        this.yDomain = [
            d3.min(allYValues),
            d3.max(allYValues)
        ]
    }
}