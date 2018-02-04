export interface ChartObject {
    setXDomain(): Array<Date>
    setYDomain(): Array<number>
    initSvg(): void
    initAxis(): void
    drawLine(): void
}