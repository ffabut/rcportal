import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ForAuthorsComponent } from './pages/for_authors/for_authors.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent
  },
  {
    path: 'for_authors',
    pathMatch: 'full',
    component: ForAuthorsComponent
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
