import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchListComponent } from '../../components/research-list/research-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ResearchListComponent],
  template: `
<header>
  <a>FFA</a>
  <a>Organigram</a>
  <a>Research</a>
  <a>Publishing</a>
  <a>Gallery</a>
  <a>MA's in Fine Arts and Design</a>
  <a>Doctoral Programmes</a>
  <a>Postdoctoral Fellowships</a>
</header>

<div id="logos">
  <img src="FaVU_zkratka_cernobile_CZ.png" alt="FFA Logo">
  <img src="FFA_abbreviation_black_white_EN.png" alt="FFA Logo">
</div>

<app-research-list></app-research-list>

<footer>
  <img src="FFA_logo_black_white_EN.png" alt="FFA Logo">
  <span>About this portal</span>
  <span>Contact person: Lenka Veselá</span>
</footer>
`,
  styles: [`
    .home {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    #logos {
      display: flex;
      height: 10vh;
      justify-content: left;
    }
    h1 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }
  `]
})
export class HomeComponent {} 