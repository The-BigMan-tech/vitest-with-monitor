import { test, expect } from 'vitest';
import { monitor } from '@typescript-guy/fn-monitor';
import { calculateTax,triggerHighIncomeAudit } from '../src/index.ts';

test('calculates correct tax for high income', () => {
    const income = 10_000;
    // baseTax (1000) + midBracketTax (8000) + (5000 * 0.3) = 10500
    const expectedTax = 10_500; 
    
    expect(calculateTax(income)).toBe(expectedTax);
});

test('triggers compliance audit for high income', () => {
    const calls = new Set()

    const monitoredCalculateTax = monitor({
        main: { 
            ref: calculateTax,
            captures:{
                triggerHighIncomeAudit
            }
        },
        inspector: (visit) => {
            visit.is('CallExpression',event => {
                const callee = event.node.callee;
                const scope = event.scope;

                if (callee.type === 'Identifier') {
                    const func = scope.variables.search(callee.name)
                    calls.add(func);
                }
            });
        }
    });

    monitoredCalculateTax(10_000);

    // Output assertion
    expect(monitoredCalculateTax(10_000)).toBe(10_500);
    
    // Internal behavior assertion (The upgrade!)
    expect(calls).toContain(triggerHighIncomeAudit);
});