import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalListComponent } from '../../components/journal-list.component';
import { HeaderComponent } from '../../components/header.component';
import { FooterComponent } from '../../components/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JournalListComponent, FooterComponent, HeaderComponent],
  styleUrl: './home.styles.scss',
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

<div class="editorial">
FFA Research in Art and Design (FFARAD) is an online open-access journal dedicated to the dissemination of practice-based research from the Faculty of Fine Arts (FFA), Brno University of Technology (BUT).
The journal provides a platform for FFA students, collectives, and cross-disciplinary teams to present research embedded in artistic and design practice that is methodologically diverse, materially grounded, and locally situated, yet outward-looking and expansive in scope.
By publishing through the Research Catalogue (RC), FFARAD cultivates a space for experimentation where media, methods, and modes of articulation sit side by side.
Insights emerge from research presented through candid, first-person vantage points, staying with the in-between: art and science, practice and theory, making and writing, data and story, studio and field. 
</div>

<app-journal-list></app-journal-list>
<app-footer></app-footer>
`})
export class HomeComponent {} 