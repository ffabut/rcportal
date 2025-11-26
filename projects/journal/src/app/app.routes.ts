import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ForAuthorsComponent } from './pages/for_authors/for_authors.component';

export const routes: Routes = [
  {
    path: '',
    title: 'FFA Research in Art and Design | Journal',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'about',
    title: 'FFARAD | About Journal',
    pathMatch: 'full',
    component: AboutComponent
  },
  {
    path: 'for_authors',
    title: 'FFARAD | For Authors',
    pathMatch: 'full',
    component: ForAuthorsComponent
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
