import { Component, HostBinding } from '@angular/core';
import { ColorSchemeService } from './header/color-scheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'btk-v2';

  constructor(private colorSchemeService: ColorSchemeService) {
    this.colorSchemeService.load();
  }
}
