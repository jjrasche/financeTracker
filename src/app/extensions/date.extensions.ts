export { monthAbbreviationsNames }

const monthAbbreviationsNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

declare global {
    interface Date {
        getFirstDayOfMonth(): Date;
        addMonthsToDate(nomths: number): Date;
        monthsBetween(d: Date): number;
        formMonthYear (): string;
    }
}

Date.prototype.getFirstDayOfMonth = function(): Date {
    return new Date(this.getFullYear(), this.getMonth(), 1);
}

Date.prototype.addMonthsToDate = function(months: number): Date {
    return new Date(new Date(this).setMonth(this.getMonth() + months))
}

Date.prototype.monthsBetween = function(d: Date): number {
    let months: number;
    if (d > this) {
        months = (d.getFullYear() - this.getFullYear()) * 12;
        months += d.getMonth() - this.getMonth();
    } else {
        months = (this.getFullYear() - d.getFullYear()) * 12;
        months += this.getMonth() - d.getMonth();
    }
    return months;
}

Date.prototype.formMonthYear = function(): string {
    return monthAbbreviationsNames[this.getMonth()] + " " + this.getFullYear();
}

