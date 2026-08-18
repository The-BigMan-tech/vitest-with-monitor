export function calculateTax(income: number): number {
    const lowThreshold = 1_000;
    const highThreshold = 5_000;
    
    const lowRate = 0.1;
    const averageRate = 0.2;
    const highRate = 0.3;
    

    const baseTax = 100; 
    const midBracketTax = 800; 

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

function triggerHighIncomeAudit(): void {
    console.log('High income audit triggered');
}
