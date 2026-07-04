export function calculateMonthlyPayment(
  principal: number,
  annualInterestRate: number,
  termMonths: number,
): number {
  if (principal <= 0 || annualInterestRate < 0 || termMonths <= 0) {
    return 0;
  }

  const monthlyInterestRate = annualInterestRate / 12 / 100;

  if (monthlyInterestRate === 0) {
    return principal / termMonths;
  }

  const compoundFactor = Math.pow(1 + monthlyInterestRate, termMonths);

  return (
    principal *
    ((monthlyInterestRate * compoundFactor) / (compoundFactor - 1))
  );
}
