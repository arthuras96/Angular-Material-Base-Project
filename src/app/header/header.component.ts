import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../security/login/login.service';
import { ColorSchemeService } from './color-scheme.service';
import { MenuItem } from './models/menu-item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'home',
      action: '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'Sair',
      icon: 'exit_to_app',
      action: 'logout',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    }
  ];

  toggleControl = new FormControl(false);

  constructor(private loginService: LoginService,
              private router: Router,
              public colorSchemeService: ColorSchemeService) { }

  ngOnInit(): void {

    if(localStorage.getItem('prefers-color') === "dark") {
      this.toggleControl.setValue(true);
    }

    this.toggleControl.valueChanges.subscribe(() => {
      console.log(this.toggleControl);
      if (this.toggleControl.value) {
        this.setTheme("dark");
      } else {
        this.setTheme("light");
      }
    });
  }

  checkAction(toGo: string): void {
    console.log(toGo);
    if(toGo == "logout") {
      this.loginService.logout();
    } else {
      this.router.navigate([toGo]);
    }
  }

  checkLogin(): boolean {
    return this.loginService.isLoggedIn()
  }

  setTheme(theme: string) {
    this.colorSchemeService.update(theme);
  }
}
