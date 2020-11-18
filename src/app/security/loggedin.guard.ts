import { CanLoad, CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService,
                private router: Router) {}

    checkAuthentication(): boolean {
        const loggedIn = this.loginService.isLoggedIn()
        if (!loggedIn) {
            this.router.navigate(['/login'])
        }
        return loggedIn
    }

    canLoad(): boolean {
        return this.checkAuthentication()
    }

    canActivate(): boolean {
        return this.checkAuthentication()
    }
}
