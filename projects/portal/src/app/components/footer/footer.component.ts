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
  <div class="contact">
    <div class="person">
      <div>Contact: Lenka Veselá</div>
      <a href="mailto:vesela@favu.vut.cz">vesela&#64;favu.vut.cz</a>
    </div>
    <a href="https://favu.vut.cz/en/" target="_blank">www.favu.vut.cz</a>
  </div>
</footer>  
`
})
export class FooterComponent {

}
