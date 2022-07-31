export function isPeriodPassed(period: number, startDate?: Date): boolean {
    return +new Date() >= +new Date(startDate || 0) + period;
}
