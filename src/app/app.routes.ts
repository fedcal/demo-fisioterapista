import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Studio Ariosto Fisioterapia Bologna — Riabilitazione e Terapie Manuali'
  },
  {
    path: 'terapie',
    loadComponent: () => import('./pages/terapie/terapie.component').then((m) => m.TerapieComponent),
    title: 'Terapie — Studio Ariosto Fisioterapia'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Studio Ariosto Fisioterapia'
  },
  {
    path: 'tecnologie',
    loadComponent: () => import('./pages/tecnologie/tecnologie.component').then((m) => m.TecnologieComponent),
    title: 'Tecnologie e Attrezzature — Studio Ariosto Fisioterapia'
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Prenota un Appuntamento — Studio Ariosto Fisioterapia'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
