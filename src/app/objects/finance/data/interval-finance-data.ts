import { ValueData } from "../../value-data";
import { FinanceDataType } from "./finance-data-type";
import { FinanceData } from "./finance-data";
import { LineData } from "../../line-data";
import { FinanceObject } from "../object/finance-object";
import { ChartObject } from "../../chart/chart-object";
import { BaseFinanceObject } from "../object/base-finance-object";
import { Interval } from "./interval"
import { IntervalType } from "./interval-type";

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
            // throw `Interval data setup for ${this.label} has total duration of ${intervalDuration} 
            //         and the domain has ${domain.length}.`;
        }

        let lineDate = new LineData(this.label);
        let interval = this.data[0];
        let domainIndex = 0;
        let preValue = this.originationAmount;
        this.data.forEach((interval: Interval, index: number) => {
            for (let i = 0; i < interval.duration; i++) {
                preValue += interval.constant;
                lineDate.values.push(new ValueData(domain[domainIndex++], preValue));
            }
            // if last interval and converging on 0 continue adding
            if (index === this.data.length - 1) {
                // while (domainIndex < domain.length) {
                while (preValue < 0) {
                    preValue += interval.constant;
                    lineDate.values.push(new ValueData(domain[domainIndex++], preValue));
                }
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

    public timeToZeroDebt(intervalType: IntervalType): Date {
        let value = this.originationAmount;
        let date = new Date();

        this.data.forEach((interval: Interval, index: number) => {
            for (let i = 0; i < interval.duration; i++) {
                value = value + interval.constant;
                date.addIntervalToDate(intervalType);
                if (value >= 0) {
                    break;
                }
            }
            // if last interval and converging on 0 continue adding
            if (index === this.data.length-1 && interval.constant > 0) {
                while (value < 0) {
                    value += interval.constant;
                    date.addIntervalToDate(intervalType);
                    console.log(value.toString() + "   " + date)
                }
            }
        });
        return date;
    }

}