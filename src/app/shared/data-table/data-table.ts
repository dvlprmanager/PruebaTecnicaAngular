import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

export interface DataTableColumn {
  key: string;
  label: string;
  type?: 'text' | 'currency' | 'percent' | 'months' | 'date' | 'number' | 'status';
}

@Component({
  selector: 'app-data-table',
  imports: [CurrencyPipe, DatePipe, MatButtonModule, MatTableModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable<T extends object> {
  @Input({ required: true }) columns: readonly DataTableColumn[] = [];
  @Input({ required: true }) data: readonly T[] = [];
  @Input() showActions = false;

  @Output() readonly viewRow = new EventEmitter<T>();
  @Output() readonly deleteRow = new EventEmitter<T>();

  protected get displayedColumns(): string[] {
    const columns = this.columns.map((column) => column.key);

    return this.showActions ? [...columns, 'actions'] : columns;
  }

  protected value(row: T, key: string): unknown {
    return row[key as keyof T];
  }

  protected numberValue(row: T, key: string): number {
    return Number(this.value(row, key));
  }

  protected dateValue(row: T, key: string): string {
    return String(this.value(row, key));
  }
}
