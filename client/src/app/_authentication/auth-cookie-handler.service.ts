import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthCookieHandlerService {

  constructor() { }

  getAuth(): string {
      return Cookie.get('user_d');
  }

  setAuth(value: string): void {
      Cookie.set('user_d', value, 1);
  }

  deleteAuth(): void {
      Cookie.delete('user_d');
  }  

}
