import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { QuotationService } from '../../../services/quotation.service';
import { SectionHeader } from '../../../shared/section-header/section-header';
import { calculateMonthlyPayment } from '../../../utils/payment-calculator';

@Component({
  selector: 'app-quotation-form',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SectionHeader,
  ],
  templateUrl: './quotation-form.html',
  styleUrl: './quotation-form.css',
})
export class QuotationForm {
  private readonly formBuilder = inject(FormBuilder);
  private readonly quotationService = inject(QuotationService);
  private readonly router = inject(Router);

  protected readonly form = this.formBuilder.nonNullable.group({
    customerName: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/),
      ],
    ],
    requestedAmount: [
      0,
      [Validators.required, Validators.min(0.01), Validators.max(60_000)],
    ],
    interestRate: [
      0,
      [Validators.required, Validators.min(0), Validators.max(20)],
    ],
    termMonths: [
      1,
      [Validators.required, Validators.min(1), Validators.max(60)],
    ],
  });

  protected get monthlyPayment(): number {
    const formValue = this.form.getRawValue();

    return calculateMonthlyPayment(
      formValue.requestedAmount,
      formValue.interestRate,
      formValue.termMonths,
    );
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.quotationService.create(this.form.getRawValue()).subscribe({
      next: (quotation) => {
        void this.router.navigate(['/detalle', quotation.id]);
      },
    });
  }
}
