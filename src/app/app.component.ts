import { Component, HostBinding } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event as RouterEvent, } from '@angular/router';
import { ColorSchemeService } from './header/color-scheme.service';
import { LoaderService } from './shared/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'btk-v2';

  constructor(private colorSchemeService: ColorSchemeService,
              public loaderService: LoaderService,
              private router: Router) {

  router.events.subscribe((event: RouterEvent) => {
    this.navigationInterceptor(event)
  })

    this.colorSchemeService.load();
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loaderService.isLoading(true);
    }
    if (event instanceof NavigationEnd) {
      this.loaderService.isLoading(false);
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
        this.loaderService.isLoading(false);
    }
    if (event instanceof NavigationError) {
        this.loaderService.isLoading(false);
    }
  }
}
