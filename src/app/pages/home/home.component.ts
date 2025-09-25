import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchListComponent } from '../../components/research-list/research-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ResearchListComponent],
  template: `
<header>
  <a href="https://favu.vut.cz/en/" target="_blank">FFA</a>
  <a href="https://favu.vut.cz/en/publishing" target="_blank">FFA Publishing</a>
  <a href="https://galerie.favu.vut.cz" target="_blank">FFA Gallery</a>
  <a href="https://www.favu.vut.cz/en/international/degree-en" target="_blank">Master's in FAAD</a>
  <a href="https://www.favu.vut.cz/en/phd" target="_blank">Doctorate in FAAD</a>
  <a href="https://www.favu.vut.cz/en/post-mag-post-doc" target="_blank">Postdoctoral Fellowships</a>
</header>

<div class="logos">
  <img src="FFA_black_white_EN.png" alt="FFA Logo">
  <img src="FFA_abbreviation_black_white_EN.png" alt="FFA Logo">
</div>

<app-research-list></app-research-list>

<footer>
  <div class="logos small">
    <img src="FFA_black_white_EN.png" alt="FFA Logo">
    <img src="FFA_abbreviation_black_white_EN.png" alt="FFA Logo">
  </div>
  <div class="contact">
    <div class="person">
      <div>Contact: Lenka Veselá</div>
      <a href="mailto:vesela@favu.vut.cz">vesela&#64;favu.vut.cz</a>
    </div>
    <a href="https://favu.vut.cz/en/" target="_blank">www.favu.vut.cz</a>
  </div>
</footer>
`})
export class HomeComponent {} 