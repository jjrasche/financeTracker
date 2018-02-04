import * as d3 from "d3";

import { FinanceData } from "../data/finance-data";
import { FinanceObjectType } from "./finance-object-type";
import { LineData } from "../../line-data";
import { FinanceObject } from "./finance-object";
import { BaseChartObject } from "../../chart/base-chart-object";
import { ValueData } from "../../value-data";
import { BaseFinanceData } from "../data/base-finance-data";

export class BaseFinanceObject extends BaseChartObject implements FinanceObject {
    name: string;
    originationDate: Date;
    type: FinanceObjectType
    originationAmount: number;
    financeData: Array<FinanceData<any>>;

    constructor(clone: BaseFinanceObject) {
        super();
        this.name = clone.name;
        this.originationDate = new Date(clone.originationDate)
        this.type = clone.type as FinanceObjectType;
        this.originationAmount = clone.originationAmount;

        this.financeData = new Array<FinanceData<any>>();
        clone.financeData.forEach(element => {
            let clonedData = BaseFinanceData.cloneTypeSpecificData(element);
            this.financeData.push(clonedData);
        });

        this.initialize();
    }


    
    public initialize(): void {
        this.setXDomain();
        this.setLinesData();
        this.setYDomain();
        this.setLineColors();
    }

    public setXDomain(): void {
        let startMonth = this.originationDate.getFirstDayOfMonth();
        let currentMonth = new Date().getFirstDayOfMonth();
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
            this.linesData.push(lineData);
        });
        
    }

    public setYDomain(): void {
        let allYValues = new Array<number>();
        this.linesData.forEach(d => {
            let tmpValues = d.values.map(vd => vd.value);
            allYValues = allYValues.concat(tmpValues);
        });
        this.yDomain = [
            d3.min(allYValues),
            d3.max(allYValues)
        ]
    }
}