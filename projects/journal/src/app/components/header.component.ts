import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
<header>
  <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
    Home
  </a>

  <a routerLink="/about" routerLinkActive="active">
    About
  </a>

  <a routerLink="/for_authors" routerLinkActive="active">
    For authors
  </a>
</header>
  `
})
export class HeaderComponent {

}
