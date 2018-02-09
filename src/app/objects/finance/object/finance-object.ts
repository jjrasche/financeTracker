import { FinanceData } from "../data/finance-data";
import { FinanceObjectType } from "./finance-object-type";
import { LineData } from "../../line-data";
import { IntervalType } from "../data/interval-type";

export interface FinanceObject {
    name: string;
    originationDate: Date;
    financeType: FinanceObjectType
    intervalType: IntervalType;
    originationAmount: number;
    financeData: Array<FinanceData<any>>;
    
    setLinesData(): void
}