import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
<header>
  <a href="./">Home</a>
  <a href="about">About</a>
  <a href="for_authors">For authors</a>
</header>
`
})
export class HeaderComponent {

}
