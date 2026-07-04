

export interface Quotation {
  id: string;
  customerName: string;
  requestedAmount: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  createdAt: string;
  status: 0 | 1;
}

export type QuotationFormValue = Pick<
  Quotation,
  'customerName' | 'requestedAmount' | 'interestRate' | 'termMonths'
>;
