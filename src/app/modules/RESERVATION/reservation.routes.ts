import { Routes } from '@angular/router';

const reservationRoutes: Routes = [
  {
    path: 'homepage',
    loadComponent: () =>
      import('./../../shared/pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'hotel/rooms/:id',
    loadComponent: () =>
      import('./pages/rooms-page/rooms-page.component').then(
        (m) => m.RoomsPageComponent
      ),
  },
];

export const RESERVATION_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'prefix',
  },
  {
    path: '',
    loadComponent: () =>
      import(
        './../../shared/layout/layout-customer/layout-customer.component'
      ).then((m) => m.LayoutCustomerComponent),
    children: reservationRoutes,
  },
  {
    path: '**',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
];
