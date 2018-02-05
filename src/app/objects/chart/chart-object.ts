import { LineData } from "../line-data";

export interface ChartObject {
    setXDomain(): Array<Date>
    setYDomain(): Array<number>
    initSvg(): void
    initAxis(): void
    drawLine(): void
    setLineColors(): void
}