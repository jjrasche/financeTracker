import { ValueData } from "../../value-data";
import { FinanceDataType } from "./finance-data-type";
import { FinanceData } from "./finance-data";
import { LineData } from "../../line-data";
import { FinanceObject } from "../object/finance-object";
import { ChartObject } from "../../chart/chart-object";
import { BaseFinanceObject } from "../object/base-finance-object";
import { Interval } from "./interval"

export class IntervalFinanceData implements FinanceData<Array<Interval>> {
    public label: string;
    public type: FinanceDataType;
    public data: Array<Interval>;
    private originationAmount

    constructor(originationAmount: number) {
        this.type = FinanceDataType.interval;
        this.originationAmount = originationAmount;
    }
    
    public convertToLineData(domain: Array<any>): LineData {
        let intervalDuration = this.totalIntervalTime();
        if (domain.length !== intervalDuration) {
            throw `Interval data setup for ${this.label} has total duration of ${intervalDuration} 
                    and the domain has ${domain.length}.`;
        }

        let lineDate = new LineData(this.label);
        let interval = this.data[0];
        let domainIndex = 0;
        let preValue = this.originationAmount;
        this.data.forEach(interval => {
            for (let i = 0; i < interval.duration; i++) {
                preValue = preValue + interval.constant;
                lineDate.values.push(new ValueData(domain[domainIndex++], preValue));
            }
        });
        return lineDate;
    }

    private totalIntervalTime(): number {
        let ret: number = 0;
        this.data.forEach(interval => {
            ret += interval.duration;
        });
        return ret;
    }
}