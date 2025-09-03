import { Routes } from '@angular/router';

const reviewsRoutes: Routes = [
  {
    path: 'homepage',
    loadComponent: () =>
      import('./../../shared/pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'opinions/:id',
    loadComponent: () =>
      import('./pages/opinions-page/opinions-page.component').then(
        (m) => m.OpinionsPageComponent
      ),
  }
];

export const REVIEWS_ROUTES: Routes = [
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
    children: reviewsRoutes,
  },
  {
    path: '**',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
];
