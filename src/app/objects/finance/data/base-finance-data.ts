import { ValueData } from "../../value-data";
import { FinanceDataType } from "./finance-data-type";
import { LineData } from "../../line-data";
import { FinanceData } from "./finance-data";
import { PointFinanceData } from "./point-finance-data";
import { BaseFinanceObject } from "../object/base-finance-object";

export abstract class BaseFinanceData<T> implements FinanceData<T> {
    label: string;
    type: FinanceDataType;
    data: T;
    
    public abstract convertToLineData(domain: Array<any>): LineData;
}