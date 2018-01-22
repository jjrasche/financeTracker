import { ValueData } from "./value-data"

export class LineData {
    public name: string;
    public values: Array<ValueData>;

    constructor(name: string) {
        this.name = name;
        this.values = new Array<ValueData>();
    }
}