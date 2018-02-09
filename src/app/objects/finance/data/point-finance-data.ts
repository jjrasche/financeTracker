import { ValueData } from "../../value-data";
import { FinanceDataType } from "./finance-data-type";
import { FinanceData } from "./finance-data";
import { LineData } from "../../line-data";
import { IntervalType } from "./interval-type";

/*
    Holds array where each item in the array represents the value 
    for the alloted time interval.
*/
export class PointFinanceData implements FinanceData<Array<number>> {
    public label: string;
    public type: FinanceDataType;
    public data: Array<number>;

    constructor() {
        this.type = FinanceDataType.point;
    }
    
    public convertToLineData(domain: Array<any>): LineData {
        if (domain.length !== this.data.length) {
            // throw `Point data setup for ${this.label} has ${this.data.length} data points
            //         and the domain has ${domain.length}.`;
        }

        let lineDate = new LineData(this.label);
        this.data.forEach((d: number, i: number) => {
            lineDate.values.push(new ValueData(domain[i], d));
        });
        return lineDate;
    }

    public timeToZeroDebt(intervalType: IntervalType): Date {
        return new Date();
    }
}