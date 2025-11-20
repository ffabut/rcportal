import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header.component';
import { FooterComponent } from '../../../../../../shared/components/footer.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  styleUrl: './for_authors.styles.scss',
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

<app-footer></app-footer>
`})
export class ForAuthorsComponent {} 