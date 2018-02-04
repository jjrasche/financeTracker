import { BaseFinanceObject } from "./base-finance-object";
import { LineData } from "../../line-data";
import { FinanceObjectType } from "./finance-object-type";
import { FinanceData } from "../data/finance-data";

export class DebtObject extends BaseFinanceObject {
    name: string;
    originationDate: Date;
    type: FinanceObjectType;
    originationAmount: number;
    data: Array<FinanceData<any>>;

    constructor(json: string) {
        super(json);
        this.type = FinanceObjectType.savings;
    }
}