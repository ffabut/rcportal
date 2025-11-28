import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header.component';
import { FooterComponent } from '../../components/footer.component'

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  styleUrl: './for_authors.styles.scss',
  template: `
<app-header></app-header>
<main>
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

<div class="paragraphish">
<p>
FFA Research in Art and Design (FFARAD) focuses on practice-based research in art and design in a broader cultural and societal context.
FFARAD aims to cultivate research through art and design by publishing research insights in the graphic format of expositions that integrate text with images, audiovisual media, graphic elements and visual storytelling.
</p>

<p>
FFARAD is an open-access digital publication of the Faculty of Fine Arts (FFA), Brno University of Technology (BUT), published under the Creative Commons licence CC BY-NC-ND.
Publication is open to all members of the FFA community, including students, academic and research staff, and alumni.
The decisive criteria are the quality and innovativeness of the research, its methodological relevance and inspirational value, and its contribution to current reflection on art- and design-based research practice.
</p>

<p>
Journal content is limited to the format of expositions.
Publication proposals are developed and prepared in close collaboration with the FFARAD editorial team, graphic designer and coder.
Prior to publication, expositions undergo internal review by FFARAD editors.
</p>

<p>
FFARAD welcomes exposition proposals consisting of a written part of approximately 2,000–6,000 words combined with images and audiovisual material, and accompanied by an outline of the intended structure and visual concept.
</p>

<p>
FFARAD expositions have a semi-fixed structure. 
</p>

<p>
All expositions must include the following metadata: exposition title, header image, abstract, longlist of at least ten relevant keywords (covering topic, methodology, key concepts, and core references), short author bio note, author profile image.
</p>

<p>
Each exposition opens with an intro page containing the exposition title, a visual element, and a short prompt inviting the reader into the exposition.
The intro page should also briefly describe the structure of the exposition and explain how to navigate it, including any specific information or recommendations, such as suggested reading conditions, the need for headphones, alerts about videos that autoplay with sound, or warnings about sensitive material.
</p>

<p>
The intro page is followed by a navigation page from which all content should be accessible. 
This navigation page should visually and conceptually reflect the topic and structure of the exposition, allowing intuitive navigation through research themes and sections.
</p>

<p>
The main body of the exposition does not follow any fixed template and depends entirely on the author’s decisions and the needs of the project.
</p>

<p>
The exposition is concluded by a reference page listing all sources in alphabetical order and a colophon with information about the creation of the exposition, acknowledgements and credits to co-authors and collaborators.
</p>

<p>
FFARAD uses the ISO 690 citation format in manner of the following examples.
</p>
</div>

</main>
<app-footer></app-footer>
`})
export class ForAuthorsComponent {} 