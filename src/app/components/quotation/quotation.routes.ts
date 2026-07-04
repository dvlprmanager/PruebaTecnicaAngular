
import { Routes } from '@angular/router';

export const quotationRoutes: Routes = [
  {
    path: 'cotizaciones',
    loadComponent: () =>
      import('./quotation-list/quotation-list').then(
        (component) => component.QuotationList,
      ),
  },
  {
    path: 'nueva-cotizacion',
    loadComponent: () =>
      import('./quotation-form/quotation-form').then(
        (component) => component.QuotationForm,
      ),
  },
  {
    path: 'detalle/:id',
    loadComponent: () =>
      import('./quotation-detail/quotation-detail').then(
        (component) => component.QuotationDetail,
      ),
  },
];