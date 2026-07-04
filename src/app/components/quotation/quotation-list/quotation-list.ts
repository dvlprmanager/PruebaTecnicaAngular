import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';

import { Quotation } from '../../../models/quotation.model';
import { QuotationService } from '../../../services/quotation.service';
import {
  DataTable,
  DataTableColumn,
} from '../../../shared/data-table/data-table';
import { SectionHeader } from '../../../shared/section-header/section-header';

@Component({
  selector: 'app-quotation-list',
  imports: [
    DataTable,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    SectionHeader,
  ],
  templateUrl: './quotation-list.html',
  styleUrl: './quotation-list.css',
})
export class QuotationList implements OnInit {
  private readonly quotationService = inject(QuotationService);
  private readonly router = inject(Router);

  protected readonly columns: DataTableColumn[] = [
    { key: 'customerName', label: 'Cliente' },
    { key: 'requestedAmount', label: 'Monto', type: 'currency' },
    { key: 'interestRate', label: 'Tasa', type: 'percent' },
    { key: 'termMonths', label: 'Plazo', type: 'months' },
    { key: 'monthlyPayment', label: 'Cuota', type: 'currency' },
    { key: 'createdAt', label: 'Fecha', type: 'date' },
    { key: 'status', label: 'Estado', type: 'status' },
  ];


    protected readonly columns2: DataTableColumn[] = [
    { key: 'nuevaKey', label: 'key' },
    { key: 'requestedAmount', label: 'Monto', type: 'currency' },

  ];

  protected readonly quotations = signal<Quotation[]>([]);


   protected readonly pruebas = [
    {
      nuevaKey:1,
      requestedAmount:10
    },
    {
      nuevaKey:1,
      requestedAmount:10
    }
   ];

  ngOnInit(): void {
    this.loadQuotations();
  }

  protected deactivate(id: string): void {
    this.quotationService.deactivate(id).subscribe({
      next: () => this.loadQuotations(),
    });
  }

  protected view(quotation: Quotation): void {
    void this.router.navigate(['/detalle', quotation.id]);
  }

  private loadQuotations(): void {
    this.quotationService.getAll().subscribe({
      next: (quotations) => {
        this.quotations.set(quotations);
      },
    });
  }
}
