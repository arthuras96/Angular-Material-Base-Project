import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { API } from 'src/app/app.api';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoginService {

    user: User = {name: "", type: "user", access_token: "", expires_in: 0, token_type: ""};
    controlBtn: boolean = false;

    constructor(private http: HttpClient,
        private router: Router,
        private cookieService: CookieService) {}
    
    login(username: string, password: string): Observable<User> {
        const httpHeaders = new HttpHeaders ({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        let grant_type = 'password';
        let body = `grant_type=${grant_type}&username=${username}&password=${password}`;

        return this.http.post<User>(API + 'api/authenticate/token', body, { headers: httpHeaders })
                        .pipe(tap(user => {
                                this.user = user;
                                if (this.user !== undefined && this.user !== null) {
                                    this.cookieService.set('User', JSON.stringify(this.user), 0.3);
                                }
                            })
                        )
    }

    getUser(): User {
        if (this.cookieService.check('User')) {
            this.user = JSON.parse(this.cookieService.get('User'));
            if (this.user !== undefined && this.user !== null) {
                return {name: "", type: "user", access_token: "", expires_in: 0, token_type: ""};
            } else {
                return this.user;
            }
        } else {
            return {name: "", type: "user", access_token: "", expires_in: 0, token_type: ""};
        }
    }

    isLoggedIn(): boolean {
        if (this.cookieService.check('User')) {
            this.user = JSON.parse(this.cookieService.get('User'));
            if (this.user !== undefined && this.user !== null) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    logout() {
        this.user = {name: "", type: "0", access_token: "", expires_in: 0, token_type: ""};
        this.cookieService.deleteAll();
        this.router.navigate(['/login']);
    }
}