import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Faculty of Fine Arts BUT | Art Research Portal',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'id/:articleId',
    title: 'FFARAD | Exposition Detail',
    loadComponent: () =>
      import('./pages/detail/detail.component')
        .then(m => m.ArticleDetailComponent),
  },
  // fallback
  { 
    path: '**',
    redirectTo: ''
  }
];
