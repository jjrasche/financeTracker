import { ValueData } from "../../value-data";
import { FinanceDataType } from "./finance-data-type";
import { LineData } from "../../line-data";
import { FinanceData } from "./finance-data";
import { PointData } from "./point-data";

export abstract class BaseFinanceData<T> implements FinanceData<T> {
    label: string;
    type: FinanceDataType;
    data: T;

    public static cloneTypeSpecificData(obj: object): FinanceData<any> {
        let ret: FinanceData<any> = new PointData();
        switch (obj[`type`]) {
            case FinanceDataType.constant: 
                break;
            case FinanceDataType.interval:
                break;
            case FinanceDataType.point:
                let ret = new PointData();
        }
        ret.label = obj[`label`];
        ret.type = obj[`type`];
        ret.data = obj[`data`];
        return ret;
    }
    
    public abstract convertToLineData(domain: Array<any>): LineData;
}