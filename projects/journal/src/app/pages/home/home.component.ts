import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalListComponent } from '../../components/journal-list/journal-list.component';
import { FooterComponent } from '../../../../../../shared/components/footer.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JournalListComponent, FooterComponent],
  styleUrl: './home.styles.scss',
  template: `
<header>
  <a href="./">Home</a>
  <a href="about">About</a>
  <a href="for_authors">For authors</a>
</header>

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





<app-journal-list></app-journal-list>
<app-footer></app-footer>
`})
export class HomeComponent {} 