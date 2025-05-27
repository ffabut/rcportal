import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchListComponent } from '../../components/research-list/research-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ResearchListComponent],
  template: `
    <div class="home">
      <h1>FFA Art Research Portal</h1>
      <app-research-list></app-research-list>
    </div>
  `,
  styles: [`
    .home {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }
  `]
})
export class HomeComponent {} 