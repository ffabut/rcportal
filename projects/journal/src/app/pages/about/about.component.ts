import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header.component';
import { FooterComponent } from '../../components/footer.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  styleUrl: './about.styles.scss',
  template: `
<app-header></app-header>

<div class="logobar">
  <div class="logos">
    <img src="FFA_black_white_EN.png" alt="FFA Logo">
    <img src="FFA_abbreviation_black_white_EN.png" alt="FFA Logo">
  </div>
  <div class="titles">
      <h1>FFA Research in Art and Design</h1>
      <div class="subtitle">ISSN: 1993-2025</div>
  </div>
</div>


<div>

<div class="editorial">
FFA Research in Art and Design (FFARAD) is an online open-access journal published by the Faculty of Fine Arts (FFA), Brno University of Technology (BUT), under the CC BY-NC-ND Creative Commons license.
The journal disseminates practice-based research in art and design by FFA students through the Research Catalogue (RC), a non-commercial platform for collaboration and publishing in artistic research provided by the Society for Artistic Research. 
Established in 2025, FFARAD publishes in English and issues ten original research expositions each year.  
</div>

<div>
  <div>Editors: Lenka Veselá, Barbora Ilič, Viktória Citráková, Tímea Vitázková</div>
  <div>Graphic design: Jozef Ondrík</div>
  <div>Coding: Andy Gajdošík</div>
  <div>Contact: Lenka Veselá <a href="mailto:vesela@favu.vut.cz">vesela&#64;favu.vut.cz</a></div>
</div>

<app-footer></app-footer>
`})
export class AboutComponent {} 