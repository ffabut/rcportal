import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchListComponent } from '../../components/research-list/research-list.component';
import { FooterComponent } from '../../components/footer/footer.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ResearchListComponent, FooterComponent],
  template: `
<header>
  <a href="https://favu.vut.cz/en/" target="_blank">FFA</a>
  <a href="https://favu.vut.cz/en/publishing" target="_blank">FFA Publishing</a>
  <a href="https://galerie.favu.vut.cz" target="_blank">FFA Gallery</a>
  <a href="https://www.favu.vut.cz/en/international/degree-en" target="_blank">FAAD</a>
  <a href="https://www.favu.vut.cz/en/phd" target="_blank">Doctorate</a>
  <a href="https://www.favu.vut.cz/en/post-mag-post-doc" target="_blank">Postdoctoral Fellowships</a>
</header>

<div class="logos">
  <img src="FFA_black_white_EN.png" alt="FFA Logo">
  <img src="FFA_abbreviation_black_white_EN.png" alt="FFA Logo">
</div>

<app-research-list></app-research-list>
<app-footer></app-footer>
`})
export class HomeComponent {} 