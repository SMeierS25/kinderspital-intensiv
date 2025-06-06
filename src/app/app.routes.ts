import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  }, 
  {
    path: 'med-calc',
    loadComponent: () => import('./pages/med-calc/med-calc.page').then(m => m.MedCalcPage)
  },
  {
    path: 'history',
    loadComponent: () => import('./pages/history/history.page').then(m => m.HistoryPage)
  }
];
