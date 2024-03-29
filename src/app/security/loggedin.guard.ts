import { CanLoad, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService,
                private router: Router) {}

    checkAuthenticationCanActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const userPermission = this.loginService.getUser().permissions;
        const loggedIn = this.loginService.isLoggedIn();
        
        if (!loggedIn) {
            this.router.navigate(['/login']);
            return false;
        }

        if(route.data.permission !== undefined && route.data.permission !== null && route.data.permission !== "") {
            if(userPermission.findIndex(permission => permission.idpermission === route.data.permission) === -1) {
                this.router.navigate(['/']);
                return false;
            }
        }

        return loggedIn;
    }

    checkAuthenticationCanLoad(): boolean {
        const loggedIn = this.loginService.isLoggedIn()
        if (!loggedIn) {
            this.router.navigate(['/login']);
        }
        return loggedIn;
    }

    canLoad(): boolean {
        return this.checkAuthenticationCanLoad();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkAuthenticationCanActivate(route, state);
    }
}
