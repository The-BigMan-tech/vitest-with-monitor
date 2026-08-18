import { test, expect } from 'vitest';
import { monitor } from '@typescript-guy/fn-monitor';
import { calculateTax,triggerHighIncomeAudit } from '../src/index';

test('calculates correct tax for high income', () => {
    const income = 10_000;
    const expectedTax = 2_400
    
    expect(calculateTax(income)).toBe(expectedTax);
});

test('triggers compliance audit for high income', () => {
    const calls = new Set()

    const monitoredCalculateTax = monitor({
        main: { 
            ref: calculateTax,//the function that we want to monitor
            captures:{
                triggerHighIncomeAudit
            }
        },
        inspector: (visit) => {
            visit.is('CallExpression',event => {
                const callee = event.node.callee;
                const scope = event.scope;

                if (callee.type !== "Identifier") return;

                const func = scope.variables.search(callee.name)
                calls.add(func);
            });
        }
    });
    // Output assertion
    expect(monitoredCalculateTax(10_000)).toBe(2_400);
    
    // Internal behavior assertion (The upgrade!)
    expect(calls).toContain(triggerHighIncomeAudit);
});