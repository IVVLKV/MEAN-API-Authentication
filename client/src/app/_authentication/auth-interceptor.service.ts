import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
      return next.handle(req);
    }
    const auth = this.injector.get(AuthenticationService);
    const authToken = auth.getAuthorizationToken();
    // Clone the request to add the new header.
    const authReq = req.clone({headers: req.headers.set('x-access-token', authToken)});
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }

}
