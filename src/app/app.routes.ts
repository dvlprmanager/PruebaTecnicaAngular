import { Routes } from '@angular/router';

import { quotationRoutes } from './components/quotation/quotation.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cotizaciones',
    pathMatch: 'full',
  },
  
  ...quotationRoutes,
  {
    path: '**',
    redirectTo: 'cotizaciones',
  },
];
