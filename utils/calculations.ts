
import { TAX_TER_CATEGORIES } from '../constants.tsx';

/**
 * Calculates BPJS Kesehatan (5% total: 4% company, 1% employee)
 * Cap: Rp 12,000,000
 */
export const calculateBPJSKesehatan = (salary: number) => {
  const cap = 12000000;
  const base = Math.min(salary, cap);
  return {
    company: base * 0.04,
    employee: base * 0.01
  };
};

/**
 * Calculates BPJS Ketenagakerjaan
 * JKK: 0.24% - 1.74% (Assume 0.24%)
 * JKM: 0.3%
 * JHT: 5.7% (3.7% company, 2% employee)
 * JP: 3% (2% company, 1% employee, cap 10,047,900)
 */
export const calculateBPJSKetenagakerjaan = (salary: number) => {
  const jpCap = 10047900;
  return {
    jkk: salary * 0.0024,
    jkm: salary * 0.003,
    jht_company: salary * 0.037,
    jht_employee: salary * 0.02,
    jp_company: Math.min(salary, jpCap) * 0.02,
    jp_employee: Math.min(salary, jpCap) * 0.01
  };
};

/**
 * PPh 21 Calculation using TER 2024 (Simplified logic for demonstration)
 * In a real app, this would be a large lookup table based on TER Category A/B/C
 */
export const calculatePPh21 = (grossIncome: number, taxStatus: string) => {
  // Determine TER Category
  let category = 'A';
  if (TAX_TER_CATEGORIES.B.includes(taxStatus)) category = 'B';
  if (TAX_TER_CATEGORIES.C.includes(taxStatus)) category = 'C';

  // Simplified TER rate calculation (placeholder for actual TER table logic)
  let rate = 0;
  if (grossIncome < 5400000) rate = 0;
  else if (grossIncome < 6500000) rate = 0.0025;
  else if (grossIncome < 7500000) rate = 0.0075;
  else if (grossIncome < 8500000) rate = 0.0125;
  else if (grossIncome < 10000000) rate = 0.02;
  else if (grossIncome < 15000000) rate = 0.05;
  else rate = 0.09;

  return grossIncome * rate;
};
