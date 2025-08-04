import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchListComponent } from '../../components/research-list/research-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ResearchListComponent],
  template: `
<header>
  <a href="https://favu.vut.cz">FFA</a>
  <a href="https://tinyurl.com/FFA-Organigram">Organigram</a>
  <a href="https://favu.vut.cz">Research</a>
  <a href="https://favu.vut.cz">Publishing</a>
  <a href="https://favu.vut.cz">Gallery</a>
  <a href="https://www.favu.vut.cz/en/students/programmes?data%5Bts%5D=N&data%5Bfs%5D=&data%5Brok%5D=2024&data%5Bjv%5D=">MA's in Fine Arts and Design</a>
  <a href="https://www.favu.vut.cz/en/phd">Doctoral Programmes</a>
  <a href="https://www.favu.vut.cz/en/post-mag-post-doc">Postdoctoral Fellowships</a>
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
    header {
      display: flex;
      flex-direction: row;
      justify-content: left;
      gap: 2rem;
      padding: 0.4rem 0.3rem 0.4rem 0.3rem;
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