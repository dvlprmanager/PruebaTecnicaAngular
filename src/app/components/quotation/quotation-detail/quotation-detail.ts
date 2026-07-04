import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Quotation } from '../../../models/quotation.model';
import { QuotationService } from '../../../services/quotation.service';

@Component({
  selector: 'app-quotation-detail',
  imports: [
    CurrencyPipe,
    DatePipe,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './quotation-detail.html',
  styleUrl: './quotation-detail.css',
})
export class QuotationDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly quotationService = inject(QuotationService);

  protected readonly quotation = signal<Quotation | undefined>(undefined);
  protected readonly loaded = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loaded.set(true);
      return;
    }

    this.quotationService.getById(id).subscribe({
      next: (quotation) => {
        this.quotation.set(quotation);
        this.loaded.set(true);
      },
      error: () => {
        this.loaded.set(true);
      },
    });
  }
}
