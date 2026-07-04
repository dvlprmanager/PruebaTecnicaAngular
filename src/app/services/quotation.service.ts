import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Quotation,
  QuotationFormValue,
} from '../models/quotation.model';
import { calculateMonthlyPayment } from '../utils/payment-calculator';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/quotations`;

  getAll(): Observable<Quotation[]> {
    //const params = new HttpParams().set('status', 1);

    return this.http.get<Quotation[]>(this.apiUrl, {  });
  }

  getById(id: string): Observable<Quotation> {
    return this.http.get<Quotation>(`${this.apiUrl}/${id}`);
  }

  create(formValue: QuotationFormValue): Observable<Quotation> {
    const quotation: Omit<Quotation, 'id'> = {
      ...formValue,
      monthlyPayment: calculateMonthlyPayment(
        formValue.requestedAmount,
        formValue.interestRate,
        formValue.termMonths,
      ),
      createdAt: new Date().toISOString(),
      status: 1,
    };

    return this.http.post<Quotation>(this.apiUrl, quotation);
  }

  deactivate(id: string): Observable<Quotation> {
    return this.http.patch<Quotation>(`${this.apiUrl}/${id}`, {
      status: 0,
    });
  }
}
