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
  <div class="logos">
    <img src="FFA_black_white_EN.png" alt="FFA Logo">
    <img src="FFA_abbreviation_black_white_EN.png" alt="FFA Logo">
  </div>
  <h1>FFA Research in Art and Design</h1>
  <div class="subtitle">ISSN: 1234-5678</div>
</header>

<app-journal-list></app-journal-list>
<app-footer></app-footer>
`})
export class HomeComponent {} 