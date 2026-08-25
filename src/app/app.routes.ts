import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Detalhes } from './pages/detalhes/detalhes';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'detalhes/:cca3',
    component: Detalhes
  },
  {
    path: '**',
    redirectTo: ''
  }
];