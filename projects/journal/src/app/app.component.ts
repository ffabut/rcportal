import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../../../shared/environments/environment';

console.log('Running with environment:', environment);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'portal';
}
