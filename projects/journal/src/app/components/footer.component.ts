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
  <div class="logos small">
    <a href="https://favu.vut.cz/en/" target="_blank">www.favu.vut.cz</a>
  </div>
</footer>
`
})
export class FooterComponent {

}
