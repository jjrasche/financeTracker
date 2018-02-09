import { ValueData } from "../../value-data";
import { FinanceDataType } from "./finance-data-type";
import { FinanceData } from "./finance-data";
import { LineData } from "../../line-data";
import { FinanceObject } from "../object/finance-object";
import { ChartObject } from "../../chart/chart-object";
import { BaseFinanceObject } from "../object/base-finance-object";
import { IntervalType } from "./interval-type";

/*
    Holds array where each item in the array represents the value 
    for the alloted time interval.
*/
export class ConstantFinanceData implements FinanceData<number> {
    public label: string;
    public type: FinanceDataType;
    public data: number;
    private originationAmount

    constructor(originationAmount: number) {
        this.type = FinanceDataType.point;
        this.originationAmount = originationAmount;
    }
    
    public convertToLineData(domain: Array<any>): LineData {
        let lineDate = new LineData(this.label);
        domain.forEach((d, i) => {
            lineDate.values.push(new ValueData(d, this.originationAmount + (i * this.data)));
        });
        return lineDate;
    }

    public timeToZeroDebt(intervalType: IntervalType): Date {
        let value = this.originationAmount;
        let date = new Date();

        // if converging on 0 continue adding
        if (this.data > 0) {
            while (value < 0) {
                value += this.data;
                date.addIntervalToDate(intervalType);
            }
        }
        return date;
    }
}