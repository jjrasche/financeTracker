import * as d3 from "d3";

import { FinanceData } from "../data/finance-data";
import { FinanceObjectType } from "./finance-object-type";
import { LineData } from "../../line-data";
import { FinanceObject } from "./finance-object";
import { BaseChartObject } from "../../chart/base-chart-object";
import { ValueData } from "../../value-data";
import { FinanceDataType } from "../data/finance-data-type";
import { PointFinanceData } from "../data/point-finance-data";
import { ConstantFinanceData } from "../data/constant-finance-data";
import { IntervalFinanceData } from "../data/interval-finance-data";
import { IntervalType } from "../data/interval-type";

export class BaseFinanceObject extends BaseChartObject implements FinanceObject {
    name: string;
    originationDate: Date;
    financeType: FinanceObjectType
    intervalType: IntervalType;
    originationAmount: number;
    financeData: Array<FinanceData<any>>;
    public defaultTimePaddingPercent: number = 25;

    constructor(clone: BaseFinanceObject) {
        super();
        this.name = clone.name;
        this.originationDate = new Date(clone.originationDate)
        this.financeType = clone.financeType as FinanceObjectType;
        this.intervalType = clone.intervalType as IntervalType;
        this.originationAmount = clone.originationAmount;

        this.financeData = new Array<FinanceData<any>>();
        clone.financeData.forEach(financeData => {
            let clonedData = this.cloneTypeSpecificData(financeData);
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
        switch (this.financeType) {
            case FinanceObjectType.savings:
                return this.setSavingsXDomain();
            case FinanceObjectType.debt:
                return this.setDebtXDomain();
            default:
                throw `Finance object has invalid type of '${this.financeType}'.`
        }
    }

    /*
     *  calculate date when all constant or interval debts reach 0 and take 
     *  longest duration   
     */
    public setDebtXDomain(): void {
        let startMonth = this.originationDate.getFirstDayOfMonth();
        let datesToZero = new Array<Date>();
        datesToZero.push(this.originationDate.getFirstDayOfMonth());

        this.financeData.forEach((fd: FinanceData<any>) => {
            datesToZero.push(fd.timeToZeroDebt(this.intervalType));
        });
        let mostFutureDate = d3.max(datesToZero);

        let tmpDate = startMonth;
        this.fullDomain.push(tmpDate);
        while (tmpDate < mostFutureDate) {
            tmpDate.addIntervalToDate(this.intervalType);
            this.fullDomain.push(new Date(tmpDate));
        }

        this.xDomain = d3.extent(this.fullDomain);
    }

    /*
     *  calculate date when all constant or interval debts reach 0 and take 
     *  longest duration   
     */
    public setSavingsXDomain(): void {
        let startMonth = this.originationDate.getFirstDayOfMonth();
        let currentMonth = new Date().getFirstDayOfMonth();
        let numberOfMonths = this.originationDate.monthsBetween(currentMonth);
        numberOfMonths = Math.ceil(numberOfMonths * (1 + this.defaultTimePaddingPercent));

        this.fullDomain.push(startMonth);
        let tmpDate = startMonth;
        for (let i = 1; i < numberOfMonths; i++) {
            tmpDate.addIntervalToDate(this.intervalType);
            this.fullDomain.push(new Date(tmpDate));
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

    public cloneTypeSpecificData(baseData: object): FinanceData<any> {
        let ret: FinanceData<any>;
        switch (baseData[`type`]) {
            case FinanceDataType.constant:
                ret = new ConstantFinanceData(this.originationAmount);
                break;
            case FinanceDataType.interval:
                ret = new IntervalFinanceData(this.originationAmount);
                break;
            case FinanceDataType.point:
                ret = new PointFinanceData();
                break;
            default:
                throw `Format issue with data, '${baseData["type"]}' is not a valid type.`;
        }
        ret.label = baseData[`label`];
        ret.type = baseData[`type`];
        ret.data = baseData[`data`];
        return ret;
    }
}