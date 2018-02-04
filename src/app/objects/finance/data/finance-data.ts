import { ValueData } from "../../value-data";
import { FinanceDataType } from "./finance-data-type";
import { LineData } from "../../line-data";

export interface FinanceData<T> {
    /*
    point, constant, step
        point (Array<number>): array where each item in the array representing the value for the alloted time interval.
        constant (number): an amount added to the previous amount every time interval.
        interval (Array<constant: number, time: number>):  array where each entry represents a <constant> change over a number of <time> intervals
    */
    label: string;
    type: FinanceDataType;
    data: T;
    
    convertToLineData(domain: Array<any>): LineData
}