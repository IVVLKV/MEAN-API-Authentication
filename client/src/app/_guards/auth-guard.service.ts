import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../_authentication/authentication.service';
import { AuthCookieHandlerService } from '../_authentication/auth-cookie-handler.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router, private http: HttpClient, private authCookie: AuthCookieHandlerService) { }

    userToken: string;

    canActivate() {
        let authenticate = this.getUserToken()

        if (authenticate) {
            return true
        } else {
            return false
        }
    }

    getUserToken() {
        let userToken = JSON.parse(this.authCookie.getAuth())
        return userToken.auth
    }


}