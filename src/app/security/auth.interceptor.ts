import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.url.includes('http://localhost')) {   
            const loginService = this.injector.get(LoginService)
            if (loginService.isLoggedIn()) {
                const UserAux = loginService.getUser()
                const authRequest = request.clone(
                    {setHeaders: {
                                    'Authorization': UserAux.token_type + ' ' + UserAux.access_token,
                                    'Content-Type': 'application/json;charset=utf-8'
                                }
                    }
                )
                // console.log(authRequest)
                return next.handle(authRequest)
            } else {
                // console.log(request)
                return next.handle(request)
            }
        } else {
            return next.handle(request);
        }
    }
}
