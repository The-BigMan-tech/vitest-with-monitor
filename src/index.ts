export function calculateTax(income: number): number {
    const lowThreshold = 1_000;
    const highThreshold = 5_000;

    const lowRate = 0.1;
    const averageRate = 0.2;
    const highRate = 0.3;

    const baseTax = 1_000;
    const midBracketTax = 8_000;

    let tax = 0;

    if (income <= lowThreshold) {
        tax = income * lowRate;
    } else if (income <= highThreshold) {
        tax = baseTax + (income - lowThreshold) * averageRate;
    } else {
        tax = baseTax + midBracketTax + (income - highThreshold) * highRate;
        // triggerHighIncomeAudit();
    }

    return tax;
}

// We export this to use in our test
export function triggerHighIncomeAudit(): void {
    console.log('High income audit triggered');
}