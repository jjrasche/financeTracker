import { FinanceData } from "../data/finance-data";
import { FinanceObjectType } from "./finance-object-type";
import { LineData } from "../../line-data";

export interface FinanceObject {
    name: string;
    originationDate: Date;
    type: FinanceObjectType
    originationAmount: number;
    financeData: Array<FinanceData<any>>;
    
    setLinesData(): void
}