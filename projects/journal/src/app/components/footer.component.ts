import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
<footer>
  <div class="logos small">
    <img src="FFA_black_white_EN.png" alt="FFA Logo">
    <img src="FFA_abbreviation_black_white_EN.png" alt="FFA Logo">
  </div>
  <div class="middle">
    This journal was launched with the financial participation of the European Union’s National Recovery Plan and the Ministry of Culture of the Czech Republic.
  </div>
  <div class="logos small noborder">
    <img src="EN_Funded_by_the_European_Union_RGB_BLACK.png" alt="Black EU logo, Black flag of European Union, title: Founded by the European Union, NextGenerationEU">
    <img src="NPO_llogo_EN_0002_NPO_logo-black.png" alt="Ministry of Culture Logo">
    <img src="ministerstvo_kultury_pozitiv_eng.png" alt="Czech Ministry of Culture Logo">
  </div>
</footer>
`
})
export class FooterComponent {

}
