import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'id/:articleId',
    loadComponent: () =>
      import('./pages/detail/detail.component')
        .then(m => m.ArticleDetailComponent),
    title: 'Exposition Detail'
  },
  // fallback
  { 
    path: '**',
    redirectTo: ''
  }
];
